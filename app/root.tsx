import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import "./index.css";
import { Layout as SiteLayout } from "./components/Layout";

export const meta: Route.MetaFunction = () => [
  { title: "Ashish | Systems Engineer" },
  { name: "description", content: "Personal portfolio and engineering logs focusing on distributed systems and scalable infrastructure." },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  
  // Open Graph / Facebook
  { property: "og:type", content: "website" },
  { property: "og:url", content: "https://code-withashish.github.io/" },
  { property: "og:title", content: "Ashish | Systems Engineer" },
  { property: "og:description", content: "Building reliable software systems. Distributed systems, backend architecture, and engineering philosophy." },
  { property: "og:image", content: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" },

  // Twitter
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:site", content: "@codewithashish" },
  { name: "twitter:creator", content: "@codewithashish" },
  { name: "twitter:url", content: "https://code-withashish.github.io/" },
  { name: "twitter:title", content: "Ashish | Systems Engineer" },
  { name: "twitter:description", content: "Building reliable software systems." },
  { name: "twitter:image", content: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop" },
];

import interRegular from "./fonts/Inter-Regular.woff2";
import jetbrainsRegular from "./fonts/JetBrainsMono-Regular.woff2";

export const links: Route.LinksFunction = () => [
  { rel: "preload", href: interRegular, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "preload", href: jetbrainsRegular, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <SiteLayout>
        <Outlet />
    </SiteLayout>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "SYSTEM_FAILURE";
  let details = "An unexpected runtime exception occurred.";
  let stack: string | undefined;
  let code = "500";

  if (isRouteErrorResponse(error)) {
    code = error.status.toString();
    message = error.status === 404 ? "ROUTE_NOT_FOUND" : "GURU_MEDITATION";
    details =
      error.status === 404
        ? `The requested signal path "${error.data || 'unknown'}" could not be established.`
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen bg-background text-text font-mono flex items-center justify-center p-6 selection:bg-red-900 selection:text-white">
      <div className="max-w-2xl w-full space-y-8 border border-red-900/50 p-8 rounded-sm bg-surface/20 relative overflow-hidden">
        {/* Decorative scanline */}
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600/50 animate-pulse"></div>
        
        <div className="flex items-center justify-between border-b border-red-900/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
            <span className="text-red-500 font-bold tracking-widest">CRITICAL ERROR</span>
          </div>
          <span className="text-red-900/50 text-xs">ERR_CODE: 0x{code}</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 tracking-tighter">
            {message}
          </h1>
          <p className="text-lg text-red-400/80 leading-relaxed font-light">
            {details}
          </p>
        </div>

        {stack && (
          <div className="bg-black/50 p-4 border border-red-900/30 rounded text-xs text-red-300/50 overflow-x-auto whitespace-pre font-mono">
            {stack}
          </div>
        )}

        <div className="pt-8 flex gap-4">
          <a 
            href="/"
            className="px-6 py-3 bg-red-900/20 border border-red-700/50 text-red-400 hover:bg-red-900/40 hover:text-red-200 transition-all uppercase tracking-widest text-xs font-medium"
          >
            Initiate_Reboot
          </a>
        </div>
      </div>
    </main>
  );
}
