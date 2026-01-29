import { Mail, Github, Linkedin, Twitter, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const channels = [
  {
    id: 'email',
    title: 'Direct Line',
    value: 'abhushan064@gmail.com',
    action: 'mailto:abhushan064@gmail.com',
    icon: Mail,
    status: 'SMTP',
    copy: true
  },
  {
    id: 'github',
    title: 'Repositories',
    value: 'code-withAshish',
    action: 'https://github.com/code-withAshish/',
    icon: Github,
    status: 'GIT',
    copy: false
  },
  {
    id: 'linkedin',
    title: 'Professional',
    value: 'in/code-withashish',
    action: 'https://www.linkedin.com/in/code-withashish/',
    icon: Linkedin,
    status: 'NETWORK',
    copy: false
  },
  {
    id: 'twitter',
    title: 'Broadcast',
    value: '@codewithashish',
    action: 'https://x.com/codewithashish',
    icon: Twitter,
    status: 'FEED',
    copy: false
  }
];

export const Contact = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="uplink" className="container-width section-spacing border-t border-border">
      <div className="flex flex-col gap-10">

        {/* Compact Header */}
        <div className="flex items-center justify-between">
          <h2 className="mono-label text-accent">05. Uplink</h2>

          <div className="flex items-center gap-3 px-3 py-1.5 border border-border/50 rounded-full bg-surface/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-mono text-muted tracking-widest uppercase">
              Ready for Transmission
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((channel) => (
            <a
              key={channel.id}
              href={channel.action}
              target={channel.id === 'email' ? undefined : "_blank"}
              rel={channel.id === 'email' ? undefined : "noopener noreferrer"}
              className="group flex flex-col justify-between p-6 bg-surface/10 border border-border hover:border-accent hover:bg-surface/30 transition-all duration-200 rounded-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-2.5 bg-background border border-border rounded-sm text-muted group-hover:text-accent group-hover:border-accent/30 transition-all">
                  <channel.icon size={20} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-muted uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                    {channel.status}
                  </span>
                  {channel.copy ? (
                    <button
                      onClick={(e) => handleCopy(e, channel.value, channel.id)}
                      className="text-muted hover:text-accent transition-colors"
                      aria-label="Copy to clipboard"
                    >
                      {copied === channel.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                  ) : (
                    <ExternalLink size={16} className="text-muted group-hover:text-accent opacity-0 group-hover:opacity-100 transition-all" />
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono text-muted uppercase tracking-wider mb-1.5 opacity-60">
                  {channel.title}
                </h4>
                <div className="text-base font-medium text-text truncate group-hover:text-accent transition-colors">
                  {channel.value}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
