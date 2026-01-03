import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://code-withashish.github.io'; // Replace with your actual domain if different
const BUILD_DIR = path.resolve(__dirname, '../build/client');
const CONTENT_DIR = path.resolve(__dirname, '../app/content');

async function generateSitemap() {
  console.log('🗺️  Generating Sitemap...');

  // 1. Get all blog posts
  const blogFiles = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));
  const blogRoutes = blogFiles.map(file => {
    const slug = file.replace('.md', '');
    return `/log/${slug}`;
  });

  // 2. Define static routes
  const routes = [
    '/',
    ...blogRoutes
  ];

  // 3. Build XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${BASE_URL}/#${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  // 4. Write sitemap.xml
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
  }
  fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), sitemap);
  console.log('✅ sitemap.xml created');

  // 5. Write robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(BUILD_DIR, 'robots.txt'), robots);
  console.log('✅ robots.txt created');
}

generateSitemap();
