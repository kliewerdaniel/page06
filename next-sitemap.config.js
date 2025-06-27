/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://your-site.com',
  generateRobotsTxt: true, // (optional)
  exclude: ['/genai-course/modules/*'], // Exclude module pages from direct sitemap generation
  transform: async (config, path) => {
    if (path.startsWith('/genai-course/modules/')) {
      return null; // Don't include module detail pages in sitemap directly
    }
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => {
    const allModuleDocs = require('./.contentlayer/generated/index.mjs').allModuleDocs;
    const modulePaths = allModuleDocs.map((doc) => ({
      loc: `/genai-course/modules/${doc.slug}`,
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: new Date().toISOString(),
    }));
    return [
      { loc: '/genai-course', changefreq: 'daily', priority: 1.0 },
      { loc: '/genai-course/syllabus', changefreq: 'monthly', priority: 0.8 },
      ...modulePaths,
    ];
  },
}
