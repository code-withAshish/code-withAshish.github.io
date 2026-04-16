import { ArrowUpRight, ArrowLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { getLogList } from '../lib/logRegistry';
import type { Route } from './+types/blog';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Engineering Log | Ashish' },
    { name: 'description', content: 'Detailed write-ups on distributed systems, infrastructure engineering, and language internals.' },
  ];
}

const CATEGORY_COLORS: Record<string, string> = {
  'Database': 'border-blue-900/40 bg-blue-900/10 text-blue-400',
  'Language Design': 'border-purple-900/40 bg-purple-900/10 text-purple-400',
  'Infrastructure': 'border-orange-900/40 bg-orange-900/10 text-orange-400',
  'System': 'border-accent/30 bg-accent/10 text-accent',
};

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function Blog() {
  const logs = getLogList();
  const categories = ['All', ...Array.from(new Set(logs.map((l) => l.category)))];
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? logs : logs.filter((l) => l.category === active);

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
        <span className="mono-label text-accent mb-4 block">Engineering Log</span>
        <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 leading-tight">
          Writing
        </h1>
        <p className="text-muted max-w-xl leading-relaxed">
          Technical deep-dives, post-mortems, and engineering notes on distributed systems,
          infrastructure, and language design.
        </p>
        <div className="h-px w-full bg-border/50 mt-8" />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-sm border transition-all duration-150 ${
              active === cat
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-border text-muted hover:border-accent/40 hover:text-text'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Post Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((log) => {
          const colorClass = CATEGORY_COLORS[log.category] ?? 'border-border bg-surface/10 text-muted';
          const readTime = estimateReadTime(log.content);
          return (
            <Link
              key={log.slug}
              to={`/log/${log.slug}`}
              className="group flex flex-col justify-between p-6 border border-border hover:border-accent/50 bg-surface/5 hover:bg-surface/20 rounded-sm transition-all duration-200"
            >
              {/* Top row: category + date */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border ${colorClass}`}
                >
                  {log.category}
                </span>
                <span className="text-[10px] font-mono text-muted">{log.date}</span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-text group-hover:text-accent transition-colors leading-snug mb-3 flex-1">
                {log.title}
              </h2>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                <span className="flex items-center gap-1.5 text-[10px] text-muted font-mono uppercase tracking-wider">
                  <BookOpen size={11} />
                  {readTime} min read
                </span>
                <span className="flex items-center gap-1 text-xs text-muted group-hover:text-accent transition-colors font-mono uppercase tracking-wider">
                  Read
                  <ArrowUpRight
                    size={14}
                    className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted font-mono text-sm">
          NO_ENTRIES_FOUND :: category={active}
        </div>
      )}

      {/* Count */}
      <p className="mt-10 text-[10px] text-muted font-mono tracking-widest">
        SHOWING {filtered.length}/{logs.length} ENTRIES
      </p>
    </section>
  );
}
