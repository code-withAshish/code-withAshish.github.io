import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getLogList } from '../lib/logRegistry';

export const Writing = () => {
  const logs = getLogList();

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
                  <span className="text-text font-medium group-hover:text-accent transition-colors flex-1 flex items-center gap-2">
                    {log.title}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-xs text-muted border border-border px-2 py-1 rounded hidden md:inline-block">
                    {log.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};