import { Terminal, Github, Linkedin, Twitter } from 'lucide-react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  const navLinkClass = (path: string) =>
    `text-xs font-mono uppercase tracking-widest transition-colors duration-200 whitespace-nowrap ${
      isActive(path) ? 'text-accent' : 'text-muted hover:text-accent'
    }`;

  return (
    <div className="min-h-screen bg-background text-text selection:bg-accent selection:text-white relative">

      {/* Vertical Guide Lines (Subtle) */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-[1px] bg-border/30 ml-[calc(50vw-36rem)] z-0" />
      <div className="hidden md:block fixed right-0 top-0 h-full w-[1px] bg-border/30 mr-[calc(50vw-36rem)] z-0" />

      {/* Top Status Bar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-200">
        <div className="container-width">
          {/* Primary Row */}
          <div className="h-14 grid grid-cols-12 items-center relative z-10">
            {/* Logo Area */}
            <div className="col-span-6 md:col-span-3 flex justify-start items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <Terminal size={16} className="text-accent shrink-0" />
              <span className="font-mono text-sm font-medium tracking-tight truncate">Ashish Bhushan Kumar</span>
            </div>

            {/* Desktop Nav - Centered */}
            <nav className="hidden md:flex col-span-6 justify-center items-center gap-8">
              <Link to="/blog" className={navLinkClass('/blog')}>
                Engineering Log
              </Link>
              <Link to="/projects" className={navLinkClass('/projects')}>
                Projects
              </Link>
              <Link to="/uses" className={navLinkClass('/uses')}>
                Uses
              </Link>
              <a
                href="#uplink"
                onClick={(e) => handleNavClick(e, 'uplink')}
                className="text-xs font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors duration-200 whitespace-nowrap"
              >
                Contact
              </a>
            </nav>

            {/* Socials - Right Aligned */}
            <div className="col-span-6 md:col-span-3 flex justify-end items-center gap-6">
              <div className="flex items-center gap-4">
                <a href="https://github.com/code-withAshish/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors" aria-label="GitHub Profile">
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/code-withashish/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors" aria-label="LinkedIn Profile">
                  <Linkedin size={18} />
                </a>
                <a href="https://x.com/codewithashish" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors" aria-label="Twitter Profile">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Nav Row */}
          <div className="md:hidden pb-3 -mt-1 overflow-x-auto no-scrollbar mask-gradient-right">
            <nav className="flex items-center gap-6 px-1">
              <Link to="/blog" className={navLinkClass('/blog')}>Engineering Log</Link>
              <Link to="/projects" className={navLinkClass('/projects')}>Projects</Link>
              <Link to="/uses" className={navLinkClass('/uses')}>Uses</Link>
              <a
                href="#uplink"
                onClick={(e) => handleNavClick(e, 'uplink')}
                className="text-xs font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors duration-200 whitespace-nowrap"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-20 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 backdrop-blur-sm relative z-10 mt-auto">
        <div className="container-width py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

            {/* Identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-accent" />
                <span className="font-mono text-sm font-semibold text-text">Ashish Bhushan Kumar</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Systems engineer focused on distributed systems and scalable infrastructure.
              </p>
              <div className="flex items-center gap-4 pt-1">
                <a href="https://github.com/code-withAshish/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors" aria-label="GitHub">
                  <Github size={16} />
                </a>
                <a href="https://www.linkedin.com/in/code-withashish/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors" aria-label="LinkedIn">
                  <Linkedin size={16} />
                </a>
                <a href="https://x.com/codewithashish" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors" aria-label="Twitter">
                  <Twitter size={16} />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Navigation</span>
              <div className="flex flex-col gap-2">
                <Link to="/" className="text-xs text-muted hover:text-accent transition-colors font-mono">Home</Link>
                <Link to="/blog" className="text-xs text-muted hover:text-accent transition-colors font-mono">Engineering Log</Link>
                <Link to="/projects" className="text-xs text-muted hover:text-accent transition-colors font-mono">Projects</Link>
                <Link to="/uses" className="text-xs text-muted hover:text-accent transition-colors font-mono">Uses</Link>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Contact</span>
              <div className="flex flex-col gap-2">
                <a href="mailto:abhushan064@gmail.com" className="text-xs text-muted hover:text-accent transition-colors font-mono">abhushan064@gmail.com</a>
                <a href="https://github.com/code-withAshish/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-accent transition-colors font-mono">github.com/code-withAshish</a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] font-mono text-muted/50 uppercase tracking-widest">
            <span>ASHISH.DEV [v.{typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__.replace(/-/g, '.') : 'DEV'}]</span>
            <div className="flex items-center gap-2">
              <span>SYSTEM: ONLINE</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

