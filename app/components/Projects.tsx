import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  role: string;
  shortDesc: string;
  problem: string;
  solution: string;
  stack: string[];
  links: { label: string; url: string }[];
}

const projects: Project[] = [
  {
    id: 'p1',
    name: 'Distributed Event Bus',
    role: 'Lead Engineer',
    shortDesc: 'High-throughput message queue based on Raft consensus.',
    problem: 'Existing solutions were too heavy for edge-deployment scenarios requiring strict consistency without external dependencies like Zookeeper.',
    solution: 'Implemented a lightweight distributed log in Go using Raft for leader election and replication. Achieved 10k ops/sec with <5ms latency on commodity hardware.',
    stack: ['Go', 'gRPC', 'Protobuf', 'Raft Consensus'],
    links: [{ label: 'Source', url: '#' }, { label: 'Whitepaper', url: '#' }]
  },
  {
    id: 'p2',
    name: 'Asset Pipeline Engine',
    role: 'Systems Architect',
    shortDesc: 'Parallel processing engine for media transformation.',
    problem: 'Sequential processing of user uploads caused significant backlogs during peak hours.',
    solution: 'Redesigned the pipeline using an event-driven worker pattern. Decoupled ingestion from processing using SQS and implemented auto-scaling worker pools.',
    stack: ['Rust', 'AWS SQS', 'Lambda', 'FFmpeg'],
    links: [{ label: 'Case Study', url: '#' }]
  },
  {
    id: 'p3',
    name: 'Graph Ingestion Service',
    role: 'Backend Engineer',
    shortDesc: 'Real-time data ingestion for large-scale knowledge graphs.',
    problem: 'Batch processing pipeline had a 24-hour latency, making data stale for downstream analytics users.',
    solution: 'Built a streaming ingestion service using Kafka Streams and Neo4j. Reduced data availability latency from 24 hours to 30 seconds.',
    stack: ['Java', 'Kafka Streams', 'Neo4j', 'Kubernetes'],
    links: [{ label: 'Source', url: '#' }]
  }
];

export const Projects = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="systems" className="container-width section-spacing border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <span className="mono-label text-accent">02. Systems Registry</span>
        </div>
        <div className="md:col-span-9">
          <div className="flex flex-col">
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-12 pb-4 border-b border-border text-xs font-mono text-muted uppercase tracking-wider">
              <div className="col-span-4">System Name</div>
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-right">Status</div>
            </div>

            {/* Rows */}
            {projects.map((project) => (
              <div key={project.id} className="border-b border-border group relative">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <button 
                  onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                  className="w-full text-left py-4 pl-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-surface/50 transition-all duration-200"
                >
                  <div className="col-span-4 font-medium text-text group-hover:text-accent transition-colors flex items-center gap-2">
                    {expanded === project.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {project.name}
                  </div>
                  <div className="col-span-6 text-sm text-muted line-clamp-1 md:line-clamp-none">
                    {project.shortDesc}
                  </div>
                  <div className="col-span-2 text-right hidden md:block">
                    <span className="text-xs font-mono border border-border px-2 py-1 rounded">
                      DEPLOYED
                    </span>
                  </div>
                </button>

                {/* Expanded Details */}
                {expanded === project.id && (
                  <div className="pb-8 pt-2 pl-0 md:pl-4 grid grid-cols-1 md:grid-cols-12 gap-8 animate-in slide-in-from-top-2 duration-200">
                    <div className="md:col-span-12 bg-surface/30 p-6 border border-border/50 rounded-sm">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div>
                            <span className="mono-label block mb-2">Problem</span>
                            <p className="text-sm text-muted leading-relaxed">{project.problem}</p>
                          </div>
                          <div>
                            <span className="mono-label block mb-2">Solution</span>
                            <p className="text-sm text-muted leading-relaxed">{project.solution}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <span className="mono-label block mb-2">Tech Stack</span>
                            <div className="flex flex-wrap gap-2">
                              {project.stack.map(tech => (
                                <span key={tech} className="text-xs border border-border px-2 py-1 text-muted">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <span className="mono-label block mb-2">Resources</span>
                            <div className="flex gap-4">
                              {project.links.map(link => (
                                <a 
                                  key={link.label} 
                                  href={link.url}
                                  className="text-sm flex items-center gap-1 hover:text-accent transition-colors"
                                >
                                  {link.label} <ExternalLink size={12} />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
