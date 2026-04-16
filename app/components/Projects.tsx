import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

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
          <h2 className="mono-label text-accent">02. Systems Registry</h2>
        </div>
        <div className="md:col-span-9">
          <div className="flex flex-col">
            {/* Table Header - Rigid Grid */}
            <div className="hidden md:grid grid-cols-12 gap-6 pb-4 border-b border-border text-[10px] font-mono font-bold uppercase tracking-widest text-muted px-4">
              <div className="col-span-4">System Name</div>
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-right">Status</div>
            </div>

            {/* Rows */}
            {projects.map((project) => (
              <div key={project.id} className="border-b border-border group relative">
                {/* Active Indicator Line */}
                <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-opacity duration-200 ${expanded === project.id ? 'bg-accent opacity-100' : 'bg-accent opacity-0 group-hover:opacity-100'}`}></div>
                
                {/* Main Interaction Button */}
                <button 
                  onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                  className="w-full text-left py-5 px-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:bg-surface/50 transition-all duration-200"
                >
                  {/* Name Column */}
                  <div className={`col-span-12 md:col-span-4 font-medium transition-colors flex items-center gap-3 ${expanded === project.id ? 'text-accent' : 'text-text group-hover:text-accent'}`}>
                    {expanded === project.id ? <ChevronUp size={14} className="shrink-0" /> : <ChevronDown size={14} className="shrink-0" />}
                    <span className="truncate">{project.name}</span>
                  </div>
                  
                  {/* Desc Column */}
                  <div className="col-span-12 md:col-span-6 text-sm md:text-base text-muted/80 line-clamp-1 md:line-clamp-none">
                    {project.shortDesc}
                  </div>
                  
                  {/* Status Column */}
                  <div className="hidden md:flex col-span-2 justify-end">
                    <span className="text-[10px] font-mono font-bold border border-green-900/30 bg-green-900/10 text-green-500 px-2 py-1 rounded tracking-wider uppercase">
                      DEPLOYED
                    </span>
                  </div>
                </button>

                {/* Expanded Details Panel */}
                {expanded === project.id && (
                  <div className="pb-10 pt-2 px-4 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid md:grid-cols-12 gap-8 lg:gap-12">
                      
                      {/* Left: Narrative (Aligned to Name col using md:col-start-1 or manual spacing?) 
                          Actually, we want it to align with the *grid*. 
                          The grid above is 4 | 6 | 2. 
                          Here we use 8 | 4. 
                          To align perfectly, we need to respect the padding. */}
                      
                      <div className="md:col-span-8 space-y-10 md:pl-7"> {/* Added padding to match chevron indentation */}
                        
                        {/* Problem Block */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-red-500/50 rounded-full"></span>
                            Problem Statement
                          </h4>
                          <p className="text-sm text-text/90 leading-relaxed">
                            {project.problem}
                          </p>
                        </div>

                        {/* Solution Block */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent/50 rounded-full"></span>
                            Engineered Solution
                          </h4>
                          <p className="text-sm text-text/90 leading-relaxed">
                            {project.solution}
                          </p>
                        </div>
                      </div>
                      
                      {/* Right: Metadata (Divider starts here) */}
                      <div className="md:col-span-4 space-y-8 md:border-l md:border-border/50 md:pl-8 lg:pl-10">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted block mb-4">Architecture Stack</span>
                          <div className="flex flex-wrap gap-2">
                            {project.stack.map(tech => (
                              <span key={tech} className="text-[10px] font-mono border border-border px-2 py-1 rounded text-muted bg-surface/30 hover:border-accent/30 transition-colors cursor-default">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted block mb-4">Deployment Links</span>
                          <div className="flex flex-col gap-3">
                            {project.links.map(link => (
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

          {/* Prominent "View All" CTA */}
          <Link
            to="/projects"
            className="group mt-6 flex items-center justify-between w-full border border-border hover:border-accent/60 bg-surface/5 hover:bg-surface/20 px-6 py-5 rounded-sm transition-all duration-200"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Systems Registry</span>
              <span className="text-base font-medium text-text group-hover:text-accent transition-colors">
                Browse all projects →
              </span>
            </div>
            <div className="flex items-center justify-center w-10 h-10 border border-border group-hover:border-accent/50 rounded-sm transition-all">
              <ArrowUpRight size={18} className="text-muted group-hover:text-accent transition-colors" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

