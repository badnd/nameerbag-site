import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { blogPosts } from '@/data/blog-posts';
import { ProductCard } from '@/components/ProductCard';
import { HomeInquiry } from '@/components/HomeInquiry';
import { JsonLd } from '@/components/JsonLd';
import { HeroCarousel } from '@/components/HeroCarousel';
import { assetPath } from '@/lib/paths';
import { i18nAlternates } from '@/lib/i18n';

export const metadata = {
  alternates: i18nAlternates('/')
};

export default function HomePage() {
  const featured = siteData.homeFeaturedProducts.map((slug) => [slug, siteData.products[slug]]).filter(([, product]) => product);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: siteData.faq.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer }
    }))
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <HeroCarousel slides={siteData.heroSlides} />

      <section className="section">
        <div className="container">
          <div className="stats">
            {[
              ['15+', 'Years in Bag Manufacturing'],
              ['3,000', 'sqm Sewing Workshop'],
              ['50', 'Team Members (35 production + 15 sales & support)'],
              ['200,000+', 'Units Produced Annually'],
              ['10+', 'Export Markets Worldwide'],
              ['50 pcs', 'MOQ Entry Tier']
            ].map(([num, label]) => (
              <div key={label}><strong>{num}</strong><span>{label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">What We Offer</span>
              <h2>Custom bag categories for your B2B business</h2>
              <p>We organize each bag type into clear product groups, richer style options and buyer-friendly pages for smoother desktop and mobile browsing.</p>
            </div>
            <Link className="btn btn-secondary" href="/products">View all products</Link>
          </div>
          <div className="grid grid-3">
            {siteData.categories.slice(0, 9).map((category) => (
              <article className="card category-card" key={category.slug}>
                <Link className="card-media" href={`/products/${category.slug}`}><img src={assetPath(category.image)} alt={category.name} /></Link>
                <div className="card-body"><h3 className="card-title">{category.name}</h3><p className="muted">{category.desc}</p><div className="card-price">{siteData.company.priceText}</div></div>
                <div className="card-actions"><Link className="btn btn-primary" href={`/products/${category.slug}`}>View Details</Link><Link className="btn btn-secondary" href={`/contact?product=${category.slug}`}>Request Quote</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <div className="section-head"><div><span className="badge">Why Choose Us</span><h2>Designed for wholesale buyers and private label projects</h2></div></div>
          <div className="grid grid-4">
            {[
              ['01', 'Wide Bag Categories', 'Backpacks, waist bags, mommy bags, chest bags, gym bags and more functional bags can be developed.'],
              ['02', 'Low MOQ Options', 'MOQ tiers from 50 pcs - typical tiers at 50 / 100 / 300 / 500 / 1,000 / 3,000+ units depending on style, material and logo method.'],
              ['03', 'Fast Sampling', 'Sample development usually takes 7-15 days after artwork and material details are confirmed.'],
              ['04', 'Reliable Production', 'Bulk production usually takes 15-30 days after sample approval, subject to actual order schedule.']
            ].map(([num, title, text]) => (
              <article className="card info-card" key={title}><div className="card-body"><div className="icon-bubble">{num}</div><h3 className="card-title">{title}</h3><p className="muted">{text}</p></div></article>
            ))}
          </div>
          <div className="price-guidance">
            <strong>Factory-direct pricing, quoted per project.</strong>
            <span>Exact pricing depends on style, fabric, quantity and logo method. Send your requirements and Anna will reply within 24 hours with a tiered quotation (per-unit prices at different MOQ levels).</span>
          </div>
          <div className="cta-banner article-cta">
            <div>
              <h2>Integrated Factory & Export Team</h2>
              <p>We operate as an integrated manufacturer and exporter: our own sewing factory in Baigou, Hebei - one of China's largest bag manufacturing hubs - handles production, while our Tianjin-based export team manages international communication, documentation and logistics. You get factory pricing with professional export service, under one roof.</p>
            </div>
          </div>
          <div className="trust-showcase">
            <div className="media-panel"><img src={assetPath('/assets/images/trust/why-choose-us.jpg')} alt="why choose Nameerbag" /></div>
            <div className="media-panel"><img src={assetPath('/assets/images/trust/factory-exterior.jpg')} alt="Nameer sewing factory in Baigou Hebei" /></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><span className="badge">Featured Products</span><h2>Popular custom bag collections and new additions</h2><p>Each product page uses inquiry-first wording and directs buyers to request a project-based quotation.</p></div></div>
          <div className="grid grid-3">
            {featured.map(([slug, product]) => <ProductCard key={slug} slug={slug} product={product} showLogoZone />)}
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <div className="process-grid">
            <div>
              <div className="section-head"><div><span className="badge">Buyer Workflow</span><h2>Simple custom bag order process</h2><p>Built for importers, wholesalers and brands that need clear communication before sampling and bulk production.</p></div></div>
              <div className="feature-list">
                {['Send Requirements', 'Confirm Details', 'Sample & Approve', 'Bulk Production'].map((title, index) => (
                  <div className="feature-item" key={title}><div className="icon-bubble">{index + 1}</div><div><strong>{title}</strong><div className="muted">{['Product type, quantity, logo, material, color, packaging and target market.', 'We review practical production options and help align the custom direction.', 'Typical sample time is 7-15 days after key details are confirmed.', 'Production usually takes 15-30 days after sample approval, based on actual scheduling.'][index]}</div></div></div>
                ))}
                <div className="feature-item"><div className="icon-bubble">S</div><div><strong>Sample fee refund policy</strong><div className="muted">Sample cost varies with design complexity. For bulk orders of 1,000+ pcs the sample fee is refunded; for 500-1,000 pcs refund is negotiable. Details confirmed during quotation.</div></div></div>
              </div>
            </div>
            <div className="media-panel trust-media"><img src={assetPath('/assets/images/trust/factory-process.jpg?v=2')} alt="custom bag manufacturing workflow" /></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <HomeInquiry />
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div><span className="badge">Buying Guides</span><h2>SEO blog system for future traffic</h2><p>These articles help buyers find us through material, MOQ, logo and sourcing questions.</p></div>
            <Link className="btn btn-secondary" href="/blog">View all guides</Link>
          </div>
          <div className="grid grid-3">
            {blogPosts.slice(0, 3).map((post) => (
              <article className="card" key={post.slug}>
                <Link className="card-media" href={`/blog/${post.slug}`}><img src={assetPath(post.hero)} alt={post.title} /></Link>
                <div className="card-body"><span className="badge">{post.category}</span><h3 className="card-title">{post.title}</h3><p className="muted">{post.description}</p></div>
                <div className="card-actions"><Link className="btn btn-primary" href={`/blog/${post.slug}`}>Read Guide</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
