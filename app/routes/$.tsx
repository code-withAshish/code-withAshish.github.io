import { Link } from 'react-router';
import type { Route } from './+types/$';

export function meta({}: Route.MetaArgs) {
  return [
    { title: '404 — Route Not Found | Ashish' },
    { name: 'description', content: 'The requested route does not exist.' },
  ];
}

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center container-width section-spacing pt-32 font-mono">
      <div className="space-y-8 max-w-lg w-full">
        {/* Terminal header bar */}
        <div className="border border-border rounded-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-surface/50 border-b border-border">
            <span className="w-2 h-2 rounded-full bg-red-500/60" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <span className="w-2 h-2 rounded-full bg-green-500/60" />
            <span className="text-[10px] text-muted tracking-widest uppercase ml-2">system — bash</span>
          </div>
          <div className="p-6 space-y-3 text-sm">
            <p className="text-muted">
              <span className="text-accent">~</span>{' '}
              <span className="text-text">curl -X GET {typeof window !== 'undefined' ? window.location.pathname : '/unknown'}</span>
            </p>
            <p className="text-red-400 font-bold tracking-wide">
              ERROR_404 :: ROUTE_NOT_FOUND
            </p>
            <p className="text-muted/60 text-xs">
              The requested path does not resolve to any known handler.
            </p>
            <div className="pt-2 border-t border-border/50 space-y-1 text-xs text-muted/60">
              <p>exit_code: 404</p>
              <p>signal: NULL_ROUTE</p>
              <p>suggestion: navigate back to root</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-text text-background px-6 py-3 text-xs font-medium hover:bg-muted transition-colors uppercase tracking-widest"
          >
            → Return to Root
          </Link>
          <Link
            to="/blog"
            className="flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium border border-border hover:border-accent hover:text-accent transition-colors uppercase tracking-widest"
          >
            Engineering Log
          </Link>
        </div>

        <p className="text-[10px] text-muted/40 tracking-widest">
          ASHISH.DEV :: NULL_POINTER @ {new Date().toISOString()}
        </p>
      </div>
    </div>
  );
}
