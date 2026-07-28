import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components/JsonLd';
import { ruBlogPosts } from '@/data/ru-blog-posts';
import { assetPath, assetUrl, siteUrl } from '@/lib/paths';

export function generateStaticParams() {
  return [{ slug: [] }, ...ruBlogPosts.map((post) => ({ slug: [post.slug] }))];
}

function find(slug) {
  return ruBlogPosts.find((post) => post.slug === (slug || []).join('/'));
}

export async function generateMetadata({ params }) {
  const { slug = [] } = await params;
  const post = find(slug);
  const ruPath = slug.length ? `/ru/blog/${slug.join('/')}` : '/ru/blog';
  const enPath = slug.length ? `/blog/${slug.join('/')}` : '/blog';
  const title = post?.title || 'Блог о производстве сумок на заказ';
  const description = post?.description || 'Практические материалы для импортёров, брендов и оптовых покупателей сумок.';
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${siteUrl}${ruPath}`,
      languages: { en: `${siteUrl}${enPath}`, ru: `${siteUrl}${ruPath}`, 'x-default': `${siteUrl}${enPath}` }
    }
  };
}

export default async function RussianBlogPage({ params }) {
  const { slug = [] } = await params;
  if (!slug.length) {
    return <section className="section bg-soft"><div className="container"><span className="badge">Руководства для покупателей</span><h1>Блог о производстве сумок на заказ</h1><p className="article-lead">Практические материалы по MOQ, OEM/ODM, образцам и выбору поставщика.</p><div className="grid grid-3">{ruBlogPosts.map((post) => <article className="card blog-card" key={post.slug}><Link className="card-media" href={`/ru/blog/${post.slug}`}><img src={assetPath(post.hero)} alt={post.title} /></Link><div className="card-body"><div className="blog-meta"><span>{post.category}</span><span>{post.date}</span></div><h2 className="card-title">{post.title}</h2><p className="muted">{post.description}</p></div><div className="card-actions"><Link className="btn btn-primary" href={`/ru/blog/${post.slug}`}>Читать статью</Link></div></article>)}</div></div></section>;
  }

  const post = find(slug);
  if (!post) notFound();
  const url = `${siteUrl}/ru/blog/${post.slug}`;
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.description, image: assetUrl(post.hero), datePublished: post.date, dateModified: post.date, author: { '@type': 'Organization', name: 'Nameer Bag' }, publisher: { '@type': 'Organization', name: 'Nameer Bag' }, mainEntityOfPage: url },
    post.faq?.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: post.faq.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) } : null
  ].filter(Boolean);

  return <>{schemas.map((schema) => <JsonLd key={schema['@type']} data={schema} />)}<article className="section article-page"><div className="container article-container"><Link className="badge" href="/ru/blog">Блог</Link><h1>{post.title}</h1><p className="article-lead">{post.description}</p><div className="blog-meta article-meta"><span>{post.category}</span><span>{post.date}</span></div><figure className="article-hero-figure"><img className="article-hero" src={assetPath(post.hero)} alt={post.title} /></figure><div className="article-content">{post.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}{post.faq?.length ? <section><h2>Частые вопросы</h2>{post.faq.map(([question, answer]) => <div key={question}><h3>{question}</h3><p>{answer}</p></div>)}</section> : null}</div><div className="cta-banner article-cta"><div><h2>Нужен расчёт сумок на заказ?</h2><p>Отправьте тип сумки, логотип, количество и целевой рынок. Мы предложим практичный план заказа.</p></div><Link className="btn btn-light" href="/ru/contact">Получить расчёт</Link></div></div></article></>;
}
