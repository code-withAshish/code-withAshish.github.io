
import { ArrowRight, Download } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="container-width section-spacing min-h-[80vh] flex flex-col justify-center relative">
      {/* Hero-specific highlight to fade grid slightly */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-transparent pointer-events-none -z-10 opacity-60"></div>

      <div className="space-y-8 relative z-10">
        <div className="space-y-2">
          <span className="mono-label text-accent">00. Identity</span>
          <h1 className="text-4xl md:text-6xl font-bold text-text max-w-2xl leading-tight">
            I design and build reliable software systems<span className="cursor-blink"></span>
          </h1>
        </div>

        <p className="text-lg text-muted font-normal leading-relaxed tracking-wide max-w-2xl">
          Focusing on the intersection of distributed systems and scalable infrastructure.
          Currently exploring advanced computing at <span className="text-accent">University</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-b border-border">
          <div className="space-y-1">
            <div className="mono-label">Location</div>
            <div className="text-sm">India</div>
          </div>
          <div className="space-y-1">
            <div className="mono-label">Focus</div>
            <div className="text-sm">Backend & Infrastructure</div>
          </div>
          <div className="space-y-1">
            <div className="mono-label">Status</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Open to Opportunities
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="#uplink" className="flex items-center gap-2 bg-text text-background px-6 py-3 text-sm font-medium hover:bg-muted transition-colors">
            Get in Touch <ArrowRight size={16} />
          </a>
          <a href="/resume.pdf" className="flex items-center gap-2 px-6 py-3 text-sm font-medium border border-border hover:border-accent hover:text-accent transition-colors">
            <Download size={16} /> Resume
          </a>
        </div>
      </div>
    </section>
  );
};
