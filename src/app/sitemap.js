import { siteData } from '@/data/site-data';
import { canonicalBlogPosts } from '@/data/blog-posts';
import { landingPages } from '@/data/landing-pages';
import { productPath, siteUrl } from '@/lib/paths';

export default function sitemap() {
  const now = new Date();
  const staticRoutes = ['/', '/products', '/custom-service', '/factory', '/about', '/contact', '/privacy-policy', '/blog'];
  const ruRoutes = ['/ru', '/ru/products', '/ru/custom-service', '/ru/factory', '/ru/about', '/ru/contact'];
  return [
    ...staticRoutes.map((route) => ({ url: `${siteUrl}${route === '/' ? '' : route}`, lastModified: now })),
    ...ruRoutes.map((route) => ({ url: `${siteUrl}${route}`, lastModified: now })),
    ...landingPages.map((page) => ({ url: `${siteUrl}/${page.slug}`, lastModified: now })),
    ...Object.keys(siteData.products).map((slug) => ({ url: `${siteUrl}${productPath(slug)}`, lastModified: now })),
    ...Object.entries(siteData.products).filter(([, product]) => product.ru).map(([slug]) => ({ url: `${siteUrl}/ru/products/${slug}`, lastModified: now })),
    ...canonicalBlogPosts.map((post) => ({ url: `${siteUrl}/blog/${post.slug}`, lastModified: post.date }))
  ];
}
