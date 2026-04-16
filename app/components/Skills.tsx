import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';

const skills = [
  'Go', 'Rust', 'TypeScript', 'Python', 'SQL',
  'System Design', 'Distributed Systems', 'Concurrency',
  'Kubernetes', 'Docker', 'AWS', 'Terraform', 'Prometheus',
  'PostgreSQL', 'Redis', 'Kafka', 'Cassandra', 'Elasticsearch',
];

export const Skills = () => {
  return (
    <section className="container-width section-spacing border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <h2 className="mono-label text-accent">03. Toolbelt</h2>
        </div>
        <div className="md:col-span-9">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-xs font-mono border border-border px-3 py-1.5 rounded-sm text-muted bg-surface/10 hover:border-accent/40 hover:text-text transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Prominent "View Full Setup" CTA */}
          <Link
            to="/uses"
            className="group mt-6 flex items-center justify-between w-full border border-border hover:border-accent/60 bg-surface/5 hover:bg-surface/20 px-6 py-5 rounded-sm transition-all duration-200"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Dev Environment</span>
              <span className="text-base font-medium text-text group-hover:text-accent transition-colors">
                Full setup & uses →
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