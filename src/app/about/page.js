import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { assetPath } from '@/lib/paths';
import { i18nAlternates } from '@/lib/i18n';

export const metadata = {
  title: 'About Nameer | Multi-Category OEM Bag Manufacturer',
  description: 'Meet Nameer, a multi-category OEM bag manufacturer supporting importers with sampling, private label development and scalable production across bag categories.',
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
            <p className="muted">{siteData.company.tagline}. Nameer helps importers build coordinated bag ranges across backpacks, waist bags, crossbody bags, mommy bags and other functional categories through one OEM team.</p>
            <div className="stats">
              <div><strong>20+</strong><span>Years in bag manufacturing</span></div>
              <div><strong>3,000</strong><span>sqm sewing workshop</span></div>
              <div><strong>50</strong><span>Team members</span></div>
              <div><strong>200,000+</strong><span>Units produced annually</span></div>
            </div>
            <div className="hero-cta"><Link className="btn btn-primary" href="/contact">Contact Sales</Link><Link className="btn btn-secondary" href="/products">View Products</Link></div>
          </div>
          <figure className="media-panel trust-figure">
            <img src={assetPath('/assets/images/trust/factory-exterior.jpg')} alt="Nameer-marked production building at the shared Baigou factory site" />
            <figcaption>Nameer-marked production building within our single, multi-building Baigou factory site.</figcaption>
          </figure>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><div><span className="badge">Our Focus</span><h2>One OEM team for multiple bag categories</h2><p>Our Baigou sewing workshop develops and produces different bag types, while the Tianjin export team coordinates specifications, documentation and logistics for importers managing more than one product category.</p><p>The Baigou operation is one factory site with separate production and office buildings; its sewing workshop covers 3,000 sqm. Tianjin Nameer International Trade Co., Ltd. and Tianjin Junyi Premium Trading Co., Ltd. use this workshop and the same production team, which is why different company names appear on site. Trade staff in Tianjin confirm specifications and manage export documents and logistics.</p></div></div>
          <div className="grid grid-3">
            {[
              ['Category Development', 'Translate references and buyer requirements into sample-ready plans for backpacks, waist bags, crossbody bags and related styles.'],
              ['Private Label Coordination', 'Align logo methods, materials, colors, trims and packaging across a broader product assortment.'],
              ['Importer Support', 'Keep MOQ, sampling, approvals and production schedules clear when several bag categories are sourced together.']
            ].map(([title, text]) => <article className="card info-card" key={title}><div className="card-body"><h3>{title}</h3><p className="muted">{text}</p></div></article>)}
          </div>
        </div>
      </section>
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">Export Markets</span>
              <h2>Multi-category supply for repeat export markets</h2>
              <p>Nameer supports buyers in the USA, Canada, Mexico, UK, Russia, Japan, Singapore, Malaysia, Bangladesh, Peru and Djibouti with product assortments adapted to their channels and category plans.</p>
            </div>
          </div>
          <div className="trust-showcase">
            <figure className="media-panel trust-figure">
              <img src={assetPath('/assets/images/trust/factory-exterior.jpg')} alt="Nameer sewing factory exterior in Baigou Hebei" />
              <figcaption>Baigou sewing workshop handling samples and production across multiple bag categories.</figcaption>
            </figure>
            <figure className="media-panel trust-figure">
              <img src={assetPath('/assets/images/trust/factory-process.jpg?v=2')} alt="Nameer custom bag production workflow" />
              <figcaption>Tianjin export team coordinating specifications, approvals, documents and shipping.</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <section className="section about-story">
        <div className="container story-layout">
          <div>
            <span className="badge">A Nameer Story</span>
            <h2>From one waist bag order to a circle of long-term buyers</h2>
          </div>
          <div className="story-copy">
            <p>In 2005, a US gift company placed an order for 300 waist bags. More than 20 years later, that buyer still returns.</p>
            <p>In 2020, one urgent project required 200 waist bags to arrive by air within 15 days. That was an exceptional event, not our normal production promise. Standard timing remains 7-15 days for samples and 15-30 days for bulk production after approval.</p>
            <p>Over time, the buyer introduced outdoor clubs, billiards clubs and yacht clubs. Those friends introduced more friends. Today, around 15 buyers within that club circle source light-customized and fully printed bags for repeat markets in the USA, Canada, Mexico, UK, Peru, Japan and Singapore.</p>
            <div className="story-actions"><Link className="btn btn-primary" href="/contact">Discuss Your Bag Program</Link><a className="btn btn-secondary" href="https://wa.me/8615102249548">WhatsApp Anna</a></div>
          </div>
        </div>
      </section>
    </>
  );
}
