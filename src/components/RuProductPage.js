import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { ProductGallery } from '@/components/ProductGallery';
import { RuQuoteForm } from '@/components/RuQuoteForm';
import { siteData } from '@/data/site-data';
import { PlainEmail } from '@/components/PlainEmail';
import { assetUrl, siteUrl } from '@/lib/paths';

export function RuProductPage({ slug, product }) {
  const localized = { ...product, ...product.ru };
  const url = `${siteUrl}/ru/products/${slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: localized.title,
    image: product.gallery.map((image) => assetUrl(image)),
    description: localized.metaDescription || localized.intro,
    brand: { '@type': 'Brand', name: 'Nameer Bag' },
    sku: product.model,
    manufacturer: { '@type': 'Organization', name: siteData.company.name },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url,
      priceCurrency: 'USD',
      price: '0.00',
      description: 'Расчёт предоставляется по запросу. Гибкий MOQ от 50 шт в зависимости от модели и кастомизации.',
      seller: { '@type': 'Organization', name: siteData.company.name }
    },
    additionalProperty: localized.specs.map(([name, value]) => ({ '@type': 'PropertyValue', name, value }))
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: `${siteUrl}/ru` },
      { '@type': 'ListItem', position: 2, name: 'Продукция', item: `${siteUrl}/ru/products` },
      { '@type': 'ListItem', position: 3, name: localized.title, item: url }
    ]
  };

  return (
    <>
      <JsonLd data={[schema, breadcrumb]} />
      <section className="section bg-soft">
        <div className="container detail-grid">
          <ProductGallery product={localized} />
          <article className="detail-main">
            <span className="badge">Мини-сумки через плечо</span>
            <h1>{localized.title}</h1>
            <p><strong>{localized.tagline}</strong></p>
            <p className="muted">{localized.intro}</p>
            <table className="spec-table"><tbody>{localized.specs.map(([name, value]) => <tr key={name}><td>{name}</td><td>{value}</td></tr>)}</tbody></table>
            <div className="hero-cta"><Link className="btn btn-primary" href={`/ru/contact?product=${encodeURIComponent(product.model)}`}>Получить расчёт</Link></div>
          </article>
          <RuQuoteForm product={`${localized.title} (${product.model})`} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><span className="badge">Преимущества</span><h2>Особенности модели</h2></div></div>
          <div className="spec-grid">{localized.features.map((feature) => <div className="spec-card" key={feature}><strong>{feature}</strong></div>)}</div>
          <div className="product-facts-panel">
            <p><strong>Цвета:</strong> {localized.colors}</p>
            <p><strong>{localized.inquiry.moq}</strong></p>
            <p>{localized.inquiry.sampling} · {localized.inquiry.bulk}</p>
            <p>{localized.inquiry.sampleFee}</p>
            <p>{localized.inquiry.logoMethods}</p>
            <p>{localized.inquiry.pricing}</p>
            <p>{localized.inquiry.services}</p>
            <p className="muted">{localized.inquiry.note}</p>
            <p><strong>Связаться с Anna Wei:</strong><br />Email: <PlainEmail email={siteData.company.email} /> · WhatsApp: +86 151 0224 9548 · WeChat: 15102249548</p>
          </div>
        </div>
      </section>
    </>
  );
}
