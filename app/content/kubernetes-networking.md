---
title: Demystifying Kubernetes Networking: CNI, Services, and DNS
date: 2026-04-02
category: Infrastructure
---

## 1. Why Kubernetes Networking Feels Like Black Magic

You apply a manifest, your pod appears as `Running`, a Service gets a `ClusterIP`, and somehow traffic flows from an Ingress through to your app. It works — until it doesn't.

A random `Connection refused`, a DNS resolution failure, or an intermittent timeout leaves you staring at `kubectl describe pod` with no obvious answer. The problem is almost always in the networking layer, and fixing it requires understanding what's actually happening beneath the `kubectl` abstraction.

This post is the guide I wish I had when I first hit these walls. We'll trace a request from end to end — from the CNI that connects pods, to kube-proxy that implements Services, to CoreDNS that resolves names.

## 2. The Kubernetes Networking Model

Before diving into implementations, understand the fundamental contract Kubernetes networking must satisfy:

1. **Every Pod gets a unique, routable IP address.**
2. **All Pods can communicate with each other directly — without NAT.** A Pod on Node A can reach a Pod on Node B using its IP directly.
3. **Pods can communicate with all Nodes, and vice versa.**

This flat, NAT-free network model is intentional. It simplifies service discovery and makes the network topology predictable. The hard part: *implementing* this across a cluster of physical machines. That's the CNI's job.

## 3. The Container Network Interface (CNI)

The **CNI** is a specification and a set of libraries for configuring network interfaces in Linux containers. Kubernetes calls a CNI plugin during pod creation to wire up the pod's network namespace.

Popular CNI plugins include Flannel, Calico, Cilium, and Weave. The choice matters for performance, security policy support, and observability.

### What happens when a Pod is created

```
kubelet creates Pod sandbox (pause container)
  → calls CNI plugin (e.g., Calico)
    → creates a veth pair (virtual ethernet cable)
      → one end goes into the Pod's network namespace
      → other end connects to the node's network bridge (cbr0 or cni0)
    → assigns the Pod IP from the node's CIDR block
    → programs routes so other nodes can reach this IP
```

The result is that every pod gets a virtual interface (`eth0`) connected to the host's bridge via a `veth` pair. Traffic leaving the pod goes through this virtual cable, hits the bridge, and then the host's routing table decides where it goes next.

### Cross-Node Communication

The CNI must also handle traffic between nodes. The two dominant approaches are:

| Approach | How it works | Example |
| :-- | :-- | :-- |
| **Overlay (VXLAN)** | Encapsulates pod packets inside UDP packets | Flannel VXLAN |
| **BGP routing** | Programs real routes into the network fabric | Calico BGP |
| **eBPF datapath** | Bypasses iptables entirely using kernel programs | Cilium |

Overlay networks are simpler but add encapsulation overhead. BGP-based routing is faster but requires network fabric cooperation. Cilium with eBPF is the modern high-performance option, replacing iptables with kernel programs.

## 4. Services and kube-proxy

A Pod IP is ephemeral — when a pod restarts, it gets a new IP. **Services** solve this by providing a stable virtual IP (`ClusterIP`) that load-balances across a set of pods.

But a `ClusterIP` isn't a real IP — no interface on any machine actually holds it. So how does traffic sent to `10.96.0.1` end up at a pod?

### iptables mode (the classic approach)

`kube-proxy` runs on every node and watches the Kubernetes API for Service and Endpoint changes. When it detects a new Service, it programs a set of **iptables** rules in the `NAT` table.

```bash
# Conceptual iptables flow for a ClusterIP service
PREROUTING → KUBE-SERVICES → KUBE-SVC-XXXX → KUBE-SEP-YYYY (DNAT to pod IP)
```

Every packet destined for the `ClusterIP:Port` matches the iptables rule, which **DNATs** (Destination NAT) it to a randomly selected pod IP. The kernel handles the actual routing from there.

The problem: iptables is a linear rule list. A cluster with 10,000 services has tens of thousands of rules. Every packet must traverse all of them. **This is O(n) per packet** and causes measurable latency at scale.

### IPVS mode (the performant approach)

IPVS (IP Virtual Server) is a Linux kernel module built for load balancing. kube-proxy IPVS mode uses it to replace the iptables chain with a proper hash table — providing **O(1) packet lookup** regardless of cluster size.

```bash
# Inspect IPVS rules
ipvsadm -Ln

# Output (simplified):
# TCP  10.96.0.1:443 rr
#   -> 172.16.1.10:6443          Round Robin weight 1
#   -> 172.16.1.11:6443          Round Robin weight 1
```

For clusters with hundreds of services, IPVS mode is strongly recommended.

### eBPF mode (the future: Cilium)

Cilium replaces kube-proxy entirely. It uses **eBPF programs** attached to network interfaces to make forwarding decisions in the kernel — before packets even reach iptables. This eliminates the NAT overhead and provides per-connection observability with near-zero cost.

## 5. DNS with CoreDNS

Service discovery in Kubernetes relies on **DNS**. CoreDNS runs as a Deployment in `kube-system` and serves the cluster's internal DNS zone.

When a pod wants to reach a service named `payments` in namespace `billing`, it resolves:

```
payments.billing.svc.cluster.local
```

The search domains in each pod's `/etc/resolv.conf` are configured by kubelet:

```
nameserver 10.96.0.10        # CoreDNS ClusterIP
search billing.svc.cluster.local svc.cluster.local cluster.local
options ndots:5
```

With `ndots:5`, any hostname with fewer than 5 dots is treated as relative first, causing the resolver to try the search domains before going to the internet. This is a common source of latency bugs: an external DNS query like `api.example.com` gets checked against 3 cluster-internal patterns before finally being treated as absolute.

**Fix:** Use FQDNs (trailing dot) in config when calling external services, or tune `ndots` in your pod spec.

```yaml
spec:
  dnsConfig:
    options:
      - name: ndots
        value: "1"
```

### CoreDNS Configuration (Corefile)

```
.:53 {
    errors
    health { lameduck 5s }
    ready
    kubernetes cluster.local in-addr.arpa ip6.arpa {
        pods insecure
        fallthrough in-addr.arpa ip6.arpa
        ttl 30
    }
    prometheus :9153
    forward . /etc/resolv.conf
    cache 30
    loop
    reload
    loadbalance
}
```

Key directives: `kubernetes` handles in-cluster resolution, `forward` delegates external queries to the node's resolver, and `cache 30` caches responses for 30 seconds to reduce load.

## 6. Debugging the Network Layer

Here's my systematic approach to diagnosing Kubernetes networking issues:

### Step 1: Verify the pod is running and has an IP

```bash
kubectl get pod <name> -o wide
```

Check: Is the `STATUS` `Running`? Does the pod have an IP in the expected CIDR?

### Step 2: Test pod-to-pod connectivity directly

```bash
# Exec into a pod and test
kubectl exec -it <pod-a> -- curl http://<pod-b-ip>:<port>
```

If this fails, the CNI is the problem. Check CNI pod logs in `kube-system`.

### Step 3: Test Service DNS resolution

```bash
kubectl exec -it <pod> -- nslookup <service-name>.<namespace>.svc.cluster.local
```

If resolution fails: CoreDNS logs. If resolution succeeds but connection fails: kube-proxy is the problem.

### Step 4: Trace iptables rules

```bash
# On the node (or via a privileged debug pod)
iptables -t nat -L KUBE-SERVICES -n | grep <service-cluster-ip>
```

This shows you whether kube-proxy has actually programmed the rules. If they're missing, kube-proxy may have restarted and not yet synced.

### Step 5: Check Network Policies

```bash
kubectl get networkpolicy -n <namespace>
```

A NetworkPolicy that inadvertently blocks traffic is a common culprit. Describe the policy and verify that your pod's labels match the `podSelector` in the egress/ingress rules.

## 7. Real-World Lessons

After running Kubernetes in production across several teams, these are the network issues I hit most often:

- **DNS timeout spikes under load:** CoreDNS throttles. Horizontal scale it and cache more aggressively.
- **Connection refused to an external service:** Almost always the `ndots` problem — the FQDN is resolving to a cluster-internal dead-end before going external.
- **Random pod evictions with network errors:** Nodes running out of available IPs in their pod CIDR. Plan your subnet sizing before you need to re-IP a production cluster.
- **kube-proxy CPU spike:** Usually from a misconfigured controller creating thousands of Service/Endpoint churn events. Profile and rate-limit your controllers.

Understanding the networking stack transforms you from someone who *uses* Kubernetes to someone who can *operate* it under pressure.

## 8. Further Reading

- [Kubernetes Networking Docs](https://kubernetes.io/docs/concepts/cluster-administration/networking/)
- [CNI Specification](https://github.com/containernetworking/cni/blob/main/SPEC.md)
- [Cilium Docs — eBPF Datapath](https://docs.cilium.io/en/stable/network/ebpf/)
- [CoreDNS Corefile Reference](https://coredns.io/manual/toc/)
