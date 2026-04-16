import { useState } from 'react';
import { ArrowLeft, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router';
import type { Route } from './+types/projects';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Projects | Ashish' },
    { name: 'description', content: 'A registry of production systems, research prototypes, and open-source work.' },
  ];
}

interface Project {
  id: string;
  name: string;
  role: string;
  shortDesc: string;
  problem: string;
  solution: string;
  stack: string[];
  links: { label: string; url: string }[];
  status: 'DEPLOYED' | 'ARCHIVED' | 'WIP';
}

const ALL_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Distributed Event Bus',
    role: 'Lead Engineer',
    shortDesc: 'High-throughput message queue based on Raft consensus.',
    problem: 'Existing solutions were too heavy for edge-deployment scenarios requiring strict consistency without external dependencies like Zookeeper.',
    solution: 'Implemented a lightweight distributed log in Go using Raft for leader election and replication. Achieved 10k ops/sec with <5ms latency on commodity hardware.',
    stack: ['Go', 'gRPC', 'Protobuf', 'Raft Consensus'],
    links: [{ label: 'Source', url: '#' }, { label: 'Whitepaper', url: '#' }],
    status: 'DEPLOYED',
  },
  {
    id: 'p2',
    name: 'Asset Pipeline Engine',
    role: 'Systems Architect',
    shortDesc: 'Parallel processing engine for media transformation workflows.',
    problem: 'Sequential processing of user uploads caused significant backlogs during peak hours, with average wait times exceeding 8 minutes.',
    solution: 'Redesigned the pipeline using an event-driven worker pattern. Decoupled ingestion from processing using SQS and implemented auto-scaling worker pools. Reduced wait time to under 10 seconds at peak.',
    stack: ['Rust', 'AWS SQS', 'Lambda', 'FFmpeg'],
    links: [{ label: 'Case Study', url: '#' }],
    status: 'DEPLOYED',
  },
  {
    id: 'p3',
    name: 'Graph Ingestion Service',
    role: 'Backend Engineer',
    shortDesc: 'Real-time data ingestion pipeline for large-scale knowledge graphs.',
    problem: 'Batch processing pipeline had a 24-hour latency, making graph data stale for downstream analytics users and ML pipelines.',
    solution: 'Built a streaming ingestion service using Kafka Streams and Neo4j. Reduced data availability latency from 24 hours to 30 seconds.',
    stack: ['Java', 'Kafka Streams', 'Neo4j', 'Kubernetes'],
    links: [{ label: 'Source', url: '#' }],
    status: 'DEPLOYED',
  },
  {
    id: 'p4',
    name: 'BlockCred',
    role: 'Lead Engineer',
    shortDesc: 'Blockchain-based academic credential issuance and verification platform.',
    problem: 'Academic credential fraud is widespread, with no efficient mechanism for third-parties to verify authenticity of certificates without contacting institutions directly.',
    solution: 'Built on Hyperledger Fabric with a chaincode-based credential lifecycle: issuance, revocation, and public verification. Exposed via a RESTful API gateway with a React dashboard.',
    stack: ['Hyperledger Fabric', 'Go', 'Node.js', 'React', 'Docker'],
    links: [{ label: 'Source', url: 'https://github.com/code-withAshish/' }],
    status: 'WIP',
  },
  {
    id: 'p5',
    name: 'resp-rs',
    role: 'Author',
    shortDesc: 'Zero-allocation RESP (Redis Serialization Protocol) parser in Rust.',
    problem: 'Existing Rust RESP parsers allocate heavily per-parse, making them unsuitable for high-frequency Redis proxy use cases where allocator pressure is significant.',
    solution: 'Implemented a streaming, zero-allocation parser using lifetimes and slices tied to the input buffer. Benchmarked at 3x throughput improvement over allocating alternatives.',
    stack: ['Rust', 'RESP Protocol', 'Cargo'],
    links: [{ label: 'Crate', url: '#' }, { label: 'Source', url: 'https://github.com/code-withAshish/' }],
    status: 'ARCHIVED',
  },
];

const STATUS_STYLES: Record<Project['status'], string> = {
  DEPLOYED: 'border-green-900/30 bg-green-900/10 text-green-500',
  WIP: 'border-yellow-900/30 bg-yellow-900/10 text-yellow-500',
  ARCHIVED: 'border-border bg-surface/20 text-muted',
};

const ALL_STACKS = Array.from(new Set(ALL_PROJECTS.flatMap((p) => p.stack))).sort();

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [activeStack, setActiveStack] = useState<string | null>(null);

  const filtered = activeStack
    ? ALL_PROJECTS.filter((p) => p.stack.includes(activeStack))
    : ALL_PROJECTS;

  return (
    <section className="container-width section-spacing pt-32 min-h-screen">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent transition-colors mb-12 group uppercase tracking-widest"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        RETURN_TO_ROOT
      </Link>

      {/* Header */}
      <div className="mb-12">
        <span className="mono-label text-accent mb-4 block">Systems Registry</span>
        <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 leading-tight">
          Projects
        </h1>
        <p className="text-muted max-w-xl leading-relaxed">
          A record of production systems, research prototypes, and open-source tools. Each one
          built to solve a real problem under real constraints.
        </p>
        <div className="h-px w-full bg-border/50 mt-8" />
      </div>

      {/* Stack Filter */}
      <div className="mb-8">
        <p className="text-[10px] font-mono text-muted uppercase tracking-widest mb-3">Filter by Technology</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveStack(null)}
            className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm border transition-all duration-150 ${
              !activeStack ? 'border-accent bg-accent/10 text-accent' : 'border-border text-muted hover:border-accent/40 hover:text-text'
            }`}
          >
            All
          </button>
          {ALL_STACKS.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveStack(activeStack === tech ? null : tech)}
              className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm border transition-all duration-150 ${
                activeStack === tech
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-muted hover:border-accent/40 hover:text-text'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Table Header */}
      <div className="flex flex-col">
        <div className="hidden md:grid grid-cols-12 gap-6 pb-4 border-b border-border text-[10px] font-mono font-bold uppercase tracking-widest text-muted px-4">
          <div className="col-span-4">System Name</div>
          <div className="col-span-5">Description</div>
          <div className="col-span-3 text-right">Status</div>
        </div>

        {filtered.map((project) => (
          <div key={project.id} className="border-b border-border group relative">
            {/* Active Indicator */}
            <div
              className={`absolute left-0 top-0 bottom-0 w-[2px] transition-opacity duration-200 ${
                expanded === project.id ? 'bg-accent opacity-100' : 'bg-accent opacity-0 group-hover:opacity-100'
              }`}
            />

            {/* Row Button */}
            <button
              onClick={() => setExpanded(expanded === project.id ? null : project.id)}
              className="w-full text-left py-5 px-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-surface/50 transition-all duration-200"
            >
              <div className={`col-span-12 md:col-span-4 font-medium transition-colors flex items-center gap-3 ${expanded === project.id ? 'text-accent' : 'text-text group-hover:text-accent'}`}>
                {expanded === project.id ? <ChevronUp size={14} className="shrink-0" /> : <ChevronDown size={14} className="shrink-0" />}
                <span className="truncate">{project.name}</span>
              </div>
              <div className="col-span-12 md:col-span-5 text-sm text-muted/80 line-clamp-1 md:line-clamp-none">
                {project.shortDesc}
              </div>
              <div className="hidden md:flex col-span-3 justify-end">
                <span className={`text-[10px] font-mono font-bold border px-2 py-1 rounded tracking-wider uppercase ${STATUS_STYLES[project.status]}`}>
                  {project.status}
                </span>
              </div>
            </button>

            {/* Expanded Panel */}
            {expanded === project.id && (
              <div className="pb-10 pt-2 px-4 animate-in slide-in-from-top-2 duration-200">
                <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
                  <div className="md:col-span-8 space-y-10 md:pl-7">
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500/50 rounded-full" />
                        Problem Statement
                      </h4>
                      <p className="text-sm text-text/90 leading-relaxed">{project.problem}</p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent/50 rounded-full" />
                        Engineered Solution
                      </h4>
                      <p className="text-sm text-text/90 leading-relaxed">{project.solution}</p>
                    </div>
                  </div>
                  <div className="md:col-span-4 space-y-8 md:border-l md:border-border/50 md:pl-8 lg:pl-10">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted block mb-4">Architecture Stack</span>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span key={tech} className="text-[10px] font-mono border border-border px-2 py-1 rounded text-muted bg-surface/30 hover:border-accent/30 transition-colors cursor-default">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted block mb-4">Deployment Links</span>
                      <div className="flex flex-col gap-3">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            className="text-xs flex items-center gap-2 text-text/80 hover:text-accent transition-colors group/link font-mono uppercase tracking-wider"
                          >
                            <ExternalLink size={12} className="text-muted group-hover/link:text-accent transition-colors" />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted font-mono text-sm">
          NO_SYSTEMS_FOUND :: stack={activeStack}
        </div>
      )}

      <p className="mt-10 text-[10px] text-muted font-mono tracking-widest">
        REGISTRY: {filtered.length}/{ALL_PROJECTS.length} SYSTEMS
      </p>
    </section>
  );
}
