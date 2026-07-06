import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { assetPath } from '@/lib/paths';
import { i18nAlternates } from '@/lib/i18n';

export const metadata = {
  title: 'About Nameer | Custom Bag Manufacturer',
  description: 'Learn about Nameer and Tianjin Junyi Premium Trading Co., Ltd., a custom bag supplier for OEM/ODM, low MOQ and private label projects.',
  alternates: i18nAlternates('/about')
};

export default function AboutPage() {
  return (
    <>
      <section className="section bg-soft">
        <div className="container about-grid">
          <div>
            <span className="badge">About Nameer</span>
            <h1>{siteData.company.name}</h1>
            <p className="muted">{siteData.company.tagline}. We support importers, wholesalers, promotional buyers and private label brands with practical custom bag development.</p>
            <div className="stats">
              <div><strong>15+</strong><span>Years in bag manufacturing</span></div>
              <div><strong>3,000</strong><span>sqm sewing workshop</span></div>
              <div><strong>50</strong><span>Team members</span></div>
              <div><strong>200,000+</strong><span>Units produced annually</span></div>
            </div>
            <div className="hero-cta"><Link className="btn btn-primary" href="/contact">Contact Sales</Link><Link className="btn btn-secondary" href="/products">View Products</Link></div>
          </div>
          <div className="media-panel"><img src={assetPath('/assets/images/trust/factory-exterior.jpg')} alt="Tianjin Junyi factory exterior" /></div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><div><span className="badge">Our Focus</span><h2>Built for B2B custom bag projects</h2><p>We operate as an integrated manufacturer and exporter: our own sewing factory in Baigou, Hebei handles production, while our Tianjin-based export team manages international communication, documentation and logistics.</p></div></div>
          <div className="grid grid-3">
            {[
              ['Product Development', 'Turn reference images, sketches and buyer requirements into sample-ready bag plans.'],
              ['Brand Customization', 'Support logo printing, embroidery, patch labels, custom colors and packaging.'],
              ['Order Communication', 'Clarify MOQ, sample timing, material options and production steps before bulk order.']
            ].map(([title, text]) => <article className="card info-card" key={title}><div className="card-body"><h3>{title}</h3><p className="muted">{text}</p></div></article>)}
          </div>
        </div>
      </section>
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">Export Markets</span>
              <h2>Factory production with Tianjin export support</h2>
              <p>Our bags ship to clients across North America (USA, Canada, Mexico), Europe (UK, Russia), Asia (Japan, Singapore, Malaysia, Bangladesh), Latin America (Peru) and Africa (Djibouti), among other markets.</p>
            </div>
          </div>
          <div className="trust-showcase">
            <figure className="media-panel trust-figure">
              <img src={assetPath('/assets/images/trust/factory-exterior.jpg')} alt="Nameer sewing factory exterior in Baigou Hebei" />
              <figcaption>Own sewing factory in Baigou, Hebei for custom bag sampling and production.</figcaption>
            </figure>
            <figure className="media-panel trust-figure">
              <img src={assetPath('/assets/images/trust/factory-process.jpg?v=2')} alt="Nameer custom bag production workflow" />
              <figcaption>Tianjin export team supports international communication, documents and logistics.</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
