const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://hire.adam.matthewsteinberger.com';

// Static pages
const staticPages = [
  {
    url: '/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    url: '/about/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    url: '/services/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  },
  {
    url: '/blog/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/novice-to-navigator/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/projects/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.9'
  }
];

// Get service pages from the services data file
function getServicePages() {
  try {
    const servicesPath = path.join(process.cwd(), 'src/data/services.ts');
    const servicesContent = fs.readFileSync(servicesPath, 'utf8');
    
    // Extract service slugs from the services array
    const slugMatches = servicesContent.match(/slug:\s*['"`]([^'"`]+)['"`]/g) || [];
    const slugs = slugMatches.map(match => match.match(/['"`]([^'"`]+)['"`]/)[1]);
    
    return slugs.map(slug => ({
      url: `/services/${slug}/`,
      lastmod: '2025-07-11',
      changefreq: 'monthly',
      priority: '0.9'
    }));
  } catch (error) {
    console.error('Error reading services data:', error);
    return [];
  }
}

// Get article pages from the articles data file
function getArticlePages() {
  try {
    const articlesPath = path.join(process.cwd(), 'src/data/articles.ts');
    const articlesContent = fs.readFileSync(articlesPath, 'utf8');
    
    // Extract article slugs from the articles array
    const slugMatches = articlesContent.match(/slug:\s*['"`]([^'"`]+)['"`]/g) || [];
    const slugs = slugMatches.map(match => match.match(/['"`]([^'"`]+)['"`]/)[1]);
    
    return slugs.map(slug => ({
      url: `/novice-to-navigator/${slug}`,
      lastmod: '2025-07-11',
      changefreq: 'monthly',
      priority: '0.7'
    }));
  } catch (error) {
    console.error('Error reading articles data:', error);
    return [];
  }
}

// Get project pages from the projects data file
function getProjectPages() {
  try {
    const projectsPath = path.join(process.cwd(), 'src/data/projects.ts');
    const projectsContent = fs.readFileSync(projectsPath, 'utf8');

    // Extract project slugs from the projects array
    const slugMatches = projectsContent.match(/slug:\s*['"`]([^'"`]+)['"`]/g) || [];
    const slugs = slugMatches.map(match => match.match(/['"`]([^'"`]+)['"`]/)[1]);

    return slugs.map(slug => ({
      url: `/projects/${slug}/`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.8'
    }));
  } catch (error) {
    console.error('Error reading projects data:', error);
    return [];
  }
}

// Get blog pages from the blog content directory
function getBlogPages() {
  try {
    const blogDir = path.join(process.cwd(), 'src/content/blog');

    if (!fs.existsSync(blogDir)) {
      return [];
    }

    const files = fs.readdirSync(blogDir);
    const blogPages = [];

    files.forEach(file => {
      if (file.endsWith('.md')) {
        const slug = file.replace('.md', '');
        const filePath = path.join(blogDir, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Extract published date from frontmatter
        const publishedMatch = content.match(/publishedDate:\s*['"`]([^'"`]+)['"`]/);
        const publishedDate = publishedMatch ? publishedMatch[1] : new Date().toISOString().split('T')[0];

        blogPages.push({
          url: `/blog/${slug}`,
          lastmod: publishedDate,
          changefreq: 'monthly',
          priority: '0.7'
        });
      }
    });

    return blogPages;
  } catch (error) {
    console.error('Error reading blog content:', error);
    return [];
  }
}

// Generate sitemap XML
function generateSitemap() {
  const allPages = [
    ...staticPages,
    ...getServicePages(),
    ...getArticlePages(),
    ...getProjectPages(),
    ...getBlogPages()
  ];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  allPages.forEach(page => {
    sitemap += `
    <url>
        <loc>${DOMAIN}${page.url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// Write sitemap to public directory
function writeSitemap() {
  try {
    console.log('Starting sitemap generation...');
    const sitemap = generateSitemap();
    const outputPath = path.join(process.cwd(), 'public/sitemap.xml');

    console.log(`Writing sitemap to ${outputPath}...`);
    fs.writeFileSync(outputPath, sitemap);
    console.log(`✅ Sitemap generated successfully at ${outputPath}`);
    console.log(`📊 Total URLs: ${sitemap.split('<url>').length - 1}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  writeSitemap();
}

module.exports = { generateSitemap, writeSitemap };