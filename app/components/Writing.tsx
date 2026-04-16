import { ArrowUpRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router';
import { getLogList } from '../lib/logRegistry';

const estimateReadTime = (content: string) =>
  Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));


export const Writing = () => {
  const logs = getLogList().slice(0, 3);

  return (
    <section id="engineering" className="container-width section-spacing border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <h2 className="mono-label text-accent">04. Engineering Log</h2>
        </div>
        <div className="md:col-span-9">
          <div className="space-y-2">
            {logs.map((log) => (
              <Link
                key={log.slug}
                to={`/log/${log.slug}`}
                className="group block"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-4 border-b border-border/50 hover:bg-surface/50 transition-colors px-2 -mx-2 rounded-sm">
                  <span className="font-mono text-xs text-muted w-24 shrink-0">{log.date}</span>
                  <span className="text-base md:text-lg text-text font-medium group-hover:text-accent transition-colors flex-1 flex items-center gap-2">
                    {log.title}
                    <ArrowUpRight size={16} className="opacity-30 group-hover:opacity-100 transition-opacity text-accent" />
                  </span>
                  <div className="hidden md:flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted border border-border px-2 py-1 rounded">{log.category}</span>
                    <span className="flex items-center gap-1 text-[10px] text-muted/60 font-mono">
                      <BookOpen size={10} />{estimateReadTime(log.content)}m
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Prominent "View All" CTA */}
          <Link
            to="/blog"
            className="group mt-6 flex items-center justify-between w-full border border-border hover:border-accent/60 bg-surface/5 hover:bg-surface/20 px-6 py-5 rounded-sm transition-all duration-200"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Engineering Log</span>
              <span className="text-base font-medium text-text group-hover:text-accent transition-colors">
                Browse all posts →
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