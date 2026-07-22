import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { siteData } from '@/data/site-data';
import { assetPath, productPath, siteUrl } from '@/lib/paths';
import { productCardImage } from '@/lib/card-images';

function serviceSchema(page) {
  const url = `${siteUrl}/${page.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.h1,
    description: page.metaDescription,
    provider: {
      '@type': 'Organization',
      name: siteData.company.name,
      url: `${siteUrl}/`,
      email: siteData.company.email,
    },
    areaServed: 'Worldwide',
    serviceType: page.serviceType,
    url,
    offers: {
      '@type': 'Offer',
      url,
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      price: '0.00',
      description: 'Custom quotation upon request. Project details are confirmed by style, fabric, quantity and logo method.',
      seller: { '@type': 'Organization', name: siteData.company.name },
    },
  };
}

function breadcrumbSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Custom Service', item: `${siteUrl}/custom-service` },
      { '@type': 'ListItem', position: 3, name: page.h1, item: `${siteUrl}/${page.slug}` },
    ],
  };
}

function faqSchema(page) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faq.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

function ProductCard({ slug }) {
  const product = siteData.products[slug];
  if (!product) return null;

  return (
    <article className="card product-card">
      <Link className="card-media" href={productPath(slug)}>
        <img src={assetPath(productCardImage(slug))} alt={product.title} loading="lazy" decoding="async" />
      </Link>
      <div className="card-body">
        <div className="chip-list">{(product.badges || []).slice(0, 3).map((badge) => <span className="badge" key={badge}>{badge}</span>)}</div>
        <h3 className="card-title">{product.title}</h3>
        <p className="muted">{product.intro}</p>
        <div className="card-price">{siteData.company.priceText}</div>
      </div>
      <div className="card-actions">
        <Link className="btn btn-primary" href={productPath(slug)}>View Product</Link>
        <Link className="btn btn-secondary" href={`/contact?product=${encodeURIComponent(slug)}`}>Request Quote</Link>
      </div>
    </article>
  );
}

export function LandingPage({ page }) {
  const schemas = [breadcrumbSchema(page), serviceSchema(page), faqSchema(page)];

  return (
    <>
      <JsonLd data={schemas} />
      <section className="section bg-soft">
        <div className="container detail-grid">
          <div className="detail-main">
            <span className="badge">{page.badge}</span>
            <h1>{page.h1}</h1>
            <p className="article-lead">{page.hero}</p>
            <div className="hero-cta">
              <Link className="btn btn-primary" href={`/contact?product=${encodeURIComponent(page.slug)}`}>Request a Quote</Link>
              <Link className="btn btn-secondary" href="/custom-service">View Custom Service</Link>
            </div>
          </div>
          <aside className="quote-card">
            <h3>Factory-direct support for custom projects.</h3>
            <p className="muted">Send your style, fabric, quantity and logo requirements. Anna will reply within 24 hours with a practical customization plan, MOQ guidance and sampling arrangement.</p>
            <Link className="btn btn-primary" href="/contact">Send Requirements</Link>
          </aside>
        </div>
      </section>

      {page.sections.map((section) => (
        <section className="section" key={section.title}>
          <div className="container">
            <div className="section-head"><div><span className="badge">{section.badge}</span><h2>{section.title}</h2></div></div>
            {section.body ? <p className="muted article-lead">{section.body}</p> : null}
            {section.items?.length ? (
              <div className="grid grid-3">
                {section.items.map((item) => (
                  <article className="card info-card" key={item.title}>
                    <div className="card-body">
                      <h3 className="card-title">{item.title}</h3>
                      <p className="muted">{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}

      {page.relatedProducts?.length ? (
        <section className="section bg-soft">
          <div className="container">
            <div className="section-head">
              <div><span className="badge">Related Products</span><h2>Real product references for this project type</h2><p>Use these existing models as starting points for quotation, logo placement and construction discussion.</p></div>
            </div>
            <div className="grid grid-3">
              {page.relatedProducts.map((slug) => <ProductCard slug={slug} key={slug} />)}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <div className="section-head"><div><span className="badge">FAQ</span><h2>Common questions before quotation</h2></div></div>
          <div className="grid grid-2">
            {page.faq.map(([question, answer]) => (
              <article className="card info-card" key={question}>
                <div className="card-body"><h3 className="card-title">{question}</h3><p className="muted">{answer}</p></div>
              </article>
            ))}
          </div>
          <div className="hero-cta">
            <Link className="btn btn-secondary" href="/">Back to Home</Link>
            {page.relatedLinks.map(([label, href]) => <Link className="btn btn-secondary" href={href} key={href}>{label}</Link>)}
          </div>
        </div>
      </section>
    </>
  );
}
