import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';
import { patterns } from '@/data/patterns';

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/patterns', priority: '0.9', changefreq: 'weekly' },
  { path: '/learning-path', priority: '0.8', changefreq: 'monthly' },
  { path: '/statistics', priority: '0.7', changefreq: 'weekly' },
  { path: '/prerequisites', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
];

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  const baseUrl = siteConfig.url;

  const urls = [
    // 静态页面
    ...staticRoutes.map(route => `
    <url>
      <loc>${baseUrl}${route.path}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>${route.changefreq}</changefreq>
      <priority>${route.priority}</priority>
    </url>`),
    // 设计模式详情页
    ...patterns.map(pattern => `
    <url>
      <loc>${baseUrl}/patterns/${pattern.id}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
