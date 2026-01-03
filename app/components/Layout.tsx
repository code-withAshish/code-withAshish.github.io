import { Terminal, Github, Linkedin, Mail, Check, Twitter } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [copied, setCopied] = useState(false);
  const email = "hello@example.com";
  const location = useLocation();
  const navigate = useNavigate();

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-text selection:bg-accent selection:text-white relative">

      {/* Vertical Guide Lines (Subtle) */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-[1px] bg-border/30 ml-[calc(50vw-36rem)] z-0" />
      <div className="hidden md:block fixed right-0 top-0 h-full w-[1px] bg-border/30 mr-[calc(50vw-36rem)] z-0" />

      {/* Top Status Bar */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-200">
        <div className="container-width">
          {/* Primary Row */}
          <div className="h-14 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => navigate('/')}>
              <Terminal size={16} className="text-accent" />
              <span className="font-mono text-sm font-medium tracking-tight">Ashish Bhushan Kumar</span>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {['Systems', 'Philosophy', 'Engineering', 'Uplink'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  className="text-xs font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-6 shrink-0">
              <div className="flex items-center gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors" aria-label="GitHub Profile">
                  <Github size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors" aria-label="LinkedIn Profile">
                  <Linkedin size={18} />
                </a>
                <a href="https://x.com/codewithashish" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-text transition-colors" aria-label="Twitter Profile">
                  <Twitter size={18} />
                </a>
                <button 
                  onClick={copyEmail}
                  className="text-muted hover:text-text transition-colors relative flex items-center"
                  title="Copy email to clipboard"
                  aria-label="Copy Email Address"
                >
                  {copied ? <Check size={18} className="text-green-500" /> : <Mail size={18} />}
                  {copied && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-surface border border-border px-2 py-1 rounded text-[10px] font-mono whitespace-nowrap text-text">
                      COPIED
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Nav Row */}
          <div className="md:hidden pb-3 -mt-1 overflow-x-auto no-scrollbar mask-gradient-right">
            <nav className="flex items-center gap-6 px-1">
              {['Systems', 'Philosophy', 'Engineering', 'Uplink'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleNavClick(e, item.toLowerCase())}
                  className="text-xs font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors duration-200 whitespace-nowrap"
                >
                  {item}
                </a>
              ))}
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
        <div className="container-width py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-muted uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            
            {/* Identity & Version */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-text">ASHISH.DEV</span>
              <span>[v.{typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__.replace(/-/g, '.') : 'DEV'}]</span>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <span>SYSTEM: ONLINE</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};
