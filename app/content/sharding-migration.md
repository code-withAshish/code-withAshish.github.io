---
title: Migrating to Horizontal Sharding
date: 2025-12-10
category: Database
---

## 1. The Bottleneck

Our primary PostgreSQL instance reached 85% CPU utilization during peak windows. Vertical scaling (upgrading to `db.m6g.16xlarge`) provided a temporary buffer, but write latency continued to degrade linearly with user growth.

### Symptoms
- P99 Write Latency: > 450ms
- Connection Pool Saturation
- Frequent Deadlocks

## 2. Migration Checklist

To ensure a zero-downtime transition, we followed this strict execution plan:

- [x] Baseline performance benchmarking
- [x] Schema compatibility audit (removing foreign keys across shards)
- [x] Implementation of consistent hashing algorithm
- [i] Shadow writing to new shards (In Progress)
- [ ] Final cutover and decommissioning of legacy master

## 3. The Sharding Strategy

We opted for **application-level sharding** based on `tenant_id`. This decision was driven by the isolation requirements of our B2B customers.

```typescript
// Simplified Sharding Logic
function getShard(tenantId: string): string {
  const hash = fnv1a(tenantId);
  const shardIndex = hash % TOTAL_SHARDS;
  return `shard_${shardIndex}`;
}
```

## 4. Implementation Challenges

The migration wasn't without issues. The biggest hurdle was handling **cross-shard transactions**.

> "Distributed transactions are the silent killer of availability."

We refactored our billing service to be eventually consistent, using an outbox pattern to ensure reliability without locking multiple shards simultaneously.

## 5. Visualizing the New Topology

Below is a conceptual schematic of the sharded architecture:

![System Architecture](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2000 "LOGICAL_TOPOLOGY_V2.0")

## 6. Performance Delta

| Metric | Baseline | Post-Sharding | Improvement |
| :--- | :--- | :--- | :--- |
| P99 Write Latency | 450ms | 12ms | **97.3%** |
| Max Throughput | 1.2k ops/s | 15.0k ops/s | **12.5x** |
| Connection Count | 1,800 | 120 (per shard) | **Efficient** |

The system is now stable at 10x the original load with room for linear horizontal expansion.