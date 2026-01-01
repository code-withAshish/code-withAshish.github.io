import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import RehypeHighlight from 'rehype-highlight';
import RemarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Tag, Hash } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router';
import { getLogBySlug } from '../lib/logRegistry';

// Import highlight.js styles
import 'highlight.js/styles/atom-one-dark.css';

export const LogViewer = () => {
  const { slug } = useParams();
  const post = slug ? getLogBySlug(slug) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    <article className="container-width section-spacing pt-32 min-h-screen">
      {/* Back Navigation */}
      <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted hover:text-accent transition-colors mb-12 group uppercase tracking-widest">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        RETURN_TO_ROOT
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="flex items-center gap-2 px-2 py-1 border border-border rounded text-[10px] text-muted uppercase tracking-wider">
            <Calendar size={12} className="text-accent" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 border border-border rounded text-[10px] text-muted uppercase tracking-wider">
            <Tag size={12} className="text-accent" />
            <span>{post.category}</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 border border-border rounded text-[10px] text-muted uppercase tracking-wider">
            <Hash size={12} className="text-accent" />
            <span>{post.slug}</span>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-text mb-4 leading-tight no-underline">
          {post.title}
        </h1>
        <div className="h-px w-full bg-border/50 mt-8"></div>
      </header>

      {/* Markdown Content */}
      <div className="max-w-none pb-20">
        <ReactMarkdown
          remarkPlugins={[RemarkGfm]}
          rehypePlugins={[RehypeHighlight]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-12 mb-6 text-text no-underline tracking-tight" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl font-semibold mt-10 mb-4 text-text flex items-center gap-2 before:content-['#'] before:text-accent/50 no-underline tracking-tight" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-lg font-medium mt-8 mb-3 text-text no-underline" {...props} />,
            p: ({node, ...props}) => <p className="text-muted leading-relaxed mb-6" {...props} />,
            strong: ({node, ...props}) => <strong className="font-bold text-text" {...props} />,
            em: ({node, ...props}) => <em className="italic text-muted" {...props} />,
            del: ({node, ...props}) => <del className="line-through opacity-50" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-6 text-muted space-y-2" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-6 text-muted space-y-2" {...props} />,
            li: ({node, ...props}) => {
              // Handle GFM task lists
              const isTask = node?.children?.some((child: any) => child.tagName === 'input');
              return <li className={`pl-2 ${isTask ? 'list-none -ml-6' : ''}`} {...props} />;
            },
            input: ({node, ...props}) => {
              if (props.type === 'checkbox') {
                return <input type="checkbox" className="mr-2 accent-accent bg-background border-border rounded-sm" readOnly checked={props.checked} />;
              }
              return <input {...props} />;
            },
            blockquote: ({node, ...props}) => (
              <blockquote className="border-l-2 border-accent pl-4 py-1 my-8 italic text-muted bg-surface/30 rounded-r-sm" {...props} />
            ),
            img: ({node, ...props}) => (
              <div className="my-10">
                <img className="rounded-sm border border-border w-full h-auto" {...props} alt={props.alt || 'Engineering schematic'} />
                {props.title && <span className="block text-center text-[10px] text-muted mt-2 font-mono uppercase tracking-widest">{props.title}</span>}
              </div>
            ),
            code: ({node, inline, className, children, ...props}: any) => {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <div className="my-6 rounded-sm border border-border overflow-hidden bg-transparent">
                  <div className="bg-surface/50 px-4 py-2 border-b border-border flex justify-between items-center">
                    <span className="text-[10px] font-mono text-muted uppercase tracking-widest">{match[1]}</span>
                  </div>
                  <pre className="bg-transparent p-4 overflow-x-auto">
                    <code className={`${className} !font-mono text-sm leading-relaxed !bg-transparent`} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              ) : (
                <code className="bg-transparent border border-border/50 px-1.5 py-0.5 rounded text-sm !font-mono text-accent" {...props}>
                  {children}
                </code>
              );
            },
            table: ({node, ...props}) => (
              <div className="overflow-x-auto my-8 border border-border rounded-sm">
                <table className="w-full text-sm text-left border-collapse" {...props} />
              </div>
            ),
            th: ({node, ...props}) => <th className="bg-surface px-4 py-3 !font-mono font-medium text-text border-b border-border uppercase tracking-widest text-[10px]" {...props} />,
            td: ({node, ...props}) => <td className="px-4 py-3 border-b border-border/50 text-muted !font-mono text-xs" {...props} />,
            hr: ({node, ...props}) => <hr className="my-12 border-border" {...props} />,
            a: ({node, ...props}) => <a className="text-accent hover:underline underline-offset-4" {...props} />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Footer / Signature */}
      <div className="mt-20 pt-8 border-t border-border flex justify-between items-center text-[10px] text-muted font-mono tracking-widest">
        <span>END_OF_LOG</span>
        <span>AUTH_SIG: {Math.random().toString(36).substring(7).toUpperCase()}</span>
      </div>
    </article>
  );
};