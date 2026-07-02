import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';
import { JsonLd } from '@/components/JsonLd';
import { assetPath, assetUrl, siteUrl } from '@/lib/paths';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      images: [{ url: assetUrl(post.hero), width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [assetUrl(post.hero)]
    }
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: assetUrl(post.hero),
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'Nameer' },
    publisher: { '@type': 'Organization', name: 'Nameer', logo: { '@type': 'ImageObject', url: assetUrl('/assets/images/brand/nameer-logo-horizontal.png?v=2') } },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`
  };

  const schemas = post.schemas ?? [articleSchema];

  return (
    <>
      {schemas.map((schema, index) => <JsonLd key={`${schema['@type']}-${index}`} data={schema} />)}
      <article className="section article-page">
        <div className="container article-container">
          <Link className="badge" href="/blog">Buying Guide</Link>
          <h1>{post.title}</h1>
          <p className="article-lead">{post.description}</p>
          <div className="blog-meta article-meta"><span>{post.category}</span><span>{post.date}</span></div>
          <img className="article-hero" src={assetPath(post.hero)} alt={post.title} />
          <div className="article-content">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
          <div className="cta-banner article-cta">
            <div>
              <h2>Need a custom bag quote?</h2>
              <p>Send your bag type, logo method, quantity and target market. We will help review the most practical order plan.</p>
            </div>
            <Link className="btn btn-light" href="/contact">Get Factory Quote</Link>
          </div>
        </div>
      </article>
    </>
  );
}
