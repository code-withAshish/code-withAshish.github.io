export interface LogEntry {
  slug: string;
  title: string;
  date: string;
  category: string;
  content: string;
}

// 1. Define the glob to get all markdown files eagerly as raw strings
const modules = import.meta.glob('../content/*.md', { query: '?raw', eager: true, import: 'default' });

// 2. Custom lightweight Frontmatter parser
const parseFrontmatter = (fileContent: string): Omit<LogEntry, 'slug'> => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    // Fallback if no frontmatter found
    return {
      title: 'Untitled Log',
      date: new Date().toISOString().split('T')[0],
      category: 'Uncategorized',
      content: fileContent
    };
  }

  const frontmatterBlock = match[1];
  const content = match[2];

  const metadata: any = {};
  frontmatterBlock.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      metadata[key.trim()] = valueParts.join(':').trim();
    }
  });

  return {
    title: metadata.title || 'Untitled',
    date: metadata.date || new Date().toISOString().split('T')[0],
    category: metadata.category || 'System',
    content: content.trim()
  };
};

// 3. Build the Registry dynamically
export const LOGS: Record<string, LogEntry> = {};

Object.entries(modules).forEach(([path, rawContent]) => {
  // Extract slug from filename: ../content/my-post.md -> my-post
  const slug = path.split('/').pop()?.replace(/\.md$/, '') || '';
  
  if (slug && typeof rawContent === 'string') {
    const { title, date, category, content } = parseFrontmatter(rawContent);
    LOGS[slug] = {
      slug,
      title,
      date,
      category,
      content
    };
  }
});

// 4. Export Accessors
export const getLogList = () => Object.values(LOGS).sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
);

export const getLogBySlug = (slug: string) => LOGS[slug];