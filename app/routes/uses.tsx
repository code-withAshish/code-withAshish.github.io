import { ArrowLeft, Monitor, Terminal, Package, Layers } from 'lucide-react';
import { Link } from 'react-router';
import type { Route } from './+types/uses';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Uses | Ashish' },
    { name: 'description', content: 'The hardware, software, CLI tools, and editor setup I use daily as a systems engineer.' },
  ];
}

interface UseItem {
  name: string;
  description: string;
  url?: string;
}

interface UseCategory {
  title: string;
  items: UseItem[];
}

const setup: UseCategory[] = [
  {
    title: 'Workstation',
    items: [
      { name: 'Machine', description: 'Primary development machine running Linux (Fedora). Chosen for containerization performance and native toolchain support.' },
      { name: 'Terminal', description: 'Ghostty with tmux for session management and persistent remote sessions over SSH.' },
      { name: 'Shell', description: 'Zsh with Starship prompt. Minimal configuration — fast startup, git status, exit codes.' },
      { name: 'Font', description: 'JetBrains Mono with ligatures enabled inside the editor. Iosevka in the terminal.' },
    ],
  },
  {
    title: 'Editor & IDE',
    items: [
      { name: 'Primary Editor', description: 'VS Code for most application work. Neovim with LSP for reading large codebases and quick file edits.' },
      { name: 'VS Code Theme', description: 'One Dark Pro — easy on the eyes for long sessions. Consistent syntax highlighting across languages.' },
      { name: 'Key Extensions', description: 'rust-analyzer, Go, ESLint, Tailwind IntelliSense, GitLens, Error Lens, Remote SSH.' },
      { name: 'Neovim Config', description: 'LazyVim as the base. Custom LSP configs for Go, Rust, and TypeScript. treesitter for syntax.' },
    ],
  },
  {
    title: 'CLI Toolbelt',
    items: [
      { name: 'ripgrep (rg)', description: 'Fast code search. Replaces grep for everything. Respects .gitignore by default.', url: 'https://github.com/BurntSushi/ripgrep' },
      { name: 'fd', description: 'A fast and user-friendly alternative to `find`. Used constantly for file discovery in large repos.', url: 'https://github.com/sharkdp/fd' },
      { name: 'bat', description: '`cat` with syntax highlighting and git diff markers. Replaces `cat` entirely.', url: 'https://github.com/sharkdp/bat' },
      { name: 'fzf', description: 'Fuzzy finder. Hooked into Ctrl+R for history search and Ctrl+T for file picker in the terminal.', url: 'https://github.com/junegunn/fzf' },
      { name: 'lazygit', description: 'Terminal UI for git. Faster than typing git commands for complex workflows like interactive rebasing.', url: 'https://github.com/jesseduffield/lazygit' },
      { name: 'jq', description: 'JSON processor. Essential for parsing API responses, Kubernetes manifest inspection, and log analysis.' },
      { name: 'k9s', description: 'Terminal-based Kubernetes cluster manager. Greatly reduces kubectl command verbosity in daily ops.', url: 'https://k9scli.io/' },
      { name: 'direnv', description: 'Loads .envrc files automatically when entering a directory. Used for per-project environment variables.' },
    ],
  },
  {
    title: 'Languages & Runtimes',
    items: [
      { name: 'Go', description: 'Primary language for backend services, CLIs, and system tools. Excellent standard library and concurrency model.' },
      { name: 'Rust', description: 'For performance-critical components where allocation control and safety guarantees matter — parsers, protocol implementations.' },
      { name: 'TypeScript + Node.js', description: 'For API gateways, BFF layers, and any user-facing web interfaces. React for frontend.' },
      { name: 'Python', description: 'For scripting, one-off data analysis, and ML experiment scaffolding. Not my first choice for production services.' },
      { name: 'SQL', description: 'PostgreSQL is the default data store for almost everything. Learned to trust the query planner and write explicit indexes.' },
    ],
  },
  {
    title: 'Infrastructure & DevOps',
    items: [
      { name: 'Docker', description: 'Containerization for all services. Multi-stage builds to minimize final image sizes to <20MB wherever possible.' },
      { name: 'Kubernetes', description: 'Production orchestration. Managed clusters on AWS EKS and self-managed for homelab experiments.' },
      { name: 'Terraform', description: 'Infrastructure as code for cloud resources. State stored in S3 with DynamoDB locking.' },
      { name: 'GitHub Actions', description: 'CI/CD for all personal projects. Container builds, tests, and deployments triggered on push.' },
      { name: 'Prometheus + Grafana', description: 'Default observability stack. Metrics scraping with alerting rules for P99 latency and error rates.' },
    ],
  },
  {
    title: 'Databases & Data Stores',
    items: [
      { name: 'PostgreSQL', description: 'The go-to relational database. Used for transactional workloads, even at scale with connection pooling via PgBouncer.' },
      { name: 'Redis', description: 'Caching, session storage, rate limiting, and as a lightweight pub/sub broker for async jobs.' },
      { name: 'Kafka', description: 'Event streaming for high-volume, decoupled producer-consumer pipelines requiring replay capability.' },
      { name: 'Cassandra', description: 'Wide-column store for time-series and write-heavy workloads where linear scaling is required.' },
    ],
  },
];

const SECTION_ICONS: Record<string, any> = {
  'Workstation': Monitor,
  'Editor & IDE': Layers,
  'CLI Toolbelt': Terminal,
  'Languages & Runtimes': Package,
  'Infrastructure & DevOps': Layers,
  'Databases & Data Stores': Package,
};

export default function Uses() {
  return (
    <article className="container-width section-spacing pt-32 min-h-screen">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent transition-colors mb-12 group uppercase tracking-widest"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        RETURN_TO_ROOT
      </Link>

      {/* Header */}
      <header className="mb-16">
        <span className="mono-label text-accent mb-4 block">Dev Environment</span>
        <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 leading-tight">
          Uses
        </h1>
        <p className="text-muted max-w-xl leading-relaxed">
          The hardware, tools, and software configuration that make up my daily development environment.
          Opinions are my own — YMMV.
        </p>
        <div className="h-px w-full bg-border/50 mt-8" />
      </header>

      {/* Sections */}
      <div className="space-y-16">
        {setup.map((section) => {
          const Icon = SECTION_ICONS[section.title] ?? Terminal;
          return (
            <div key={section.title} className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left: Section Label */}
              <div className="md:col-span-3">
                <div className="flex items-center gap-2 sticky top-24">
                  <Icon size={14} className="text-accent shrink-0" />
                  <h2 className="mono-label text-accent">{section.title}</h2>
                </div>
              </div>

              {/* Right: Items */}
              <div className="md:col-span-9 space-y-px">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8 py-5 border-b border-border/50 hover:bg-surface/30 transition-colors px-3 -mx-3 rounded-sm"
                  >
                    {/* Name */}
                    <div className="sm:w-48 shrink-0">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-text group-hover:text-accent transition-colors hover:underline underline-offset-4"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-text group-hover:text-accent transition-colors">
                          {item.name}
                        </span>
                      )}
                    </div>
                    {/* Description */}
                    <p className="text-sm text-muted leading-relaxed flex-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-border flex justify-between items-center text-[10px] text-muted font-mono tracking-widest">
        <span>SETUP_SNAPSHOT</span>
        <span>LAST_UPDATED: {new Date().toISOString().split('T')[0]}</span>
      </div>
    </article>
  );
}
