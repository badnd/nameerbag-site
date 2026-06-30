import Link from 'next/link';
import { assetPath } from '@/lib/paths';

export const metadata = {
  title: 'Factory Strength | Custom Bag OEM/ODM',
  description: 'Factory workflow for custom bag sampling, logo confirmation, bulk production and quality control for B2B orders.',
  alternates: { canonical: '/factory' }
};

export default function FactoryPage() {
  const productionVideos = [
    ['Multi-Station Workshop', '/assets/videos/factory/factory-overview-multistation-21s.mp4', 'Live view of coordinated workshop stations for custom bag sampling and bulk production.'],
    ['Close Sewing Work', '/assets/videos/factory/factory-sewing-closeup-13s.mp4', 'Skilled sewing teams handle straps, seams and reinforcement details for functional bags.'],
    ['QC and Packing', '/assets/videos/factory/factory-qc-packing-34s.mp4', 'Finished goods are checked, organized and packed according to order requirements before shipment.']
  ];

  return (
    <>
      <section className="section bg-soft">
        <div className="container process-grid">
          <div>
            <span className="badge">Factory Workflow</span>
            <h1>Clear custom bag production process</h1>
            <p className="muted">From product idea to sampling and bulk order, we keep the workflow practical for overseas buyers.</p>
            <div className="feature-list">
              {['Requirement review', 'Material and logo confirmation', 'Sample development', 'Bulk production and packing'].map((item, index) => (
                <div className="feature-item" key={item}><div className="icon-bubble">{index + 1}</div><div><strong>{item}</strong><div className="muted">Step {index + 1} for transparent production communication.</div></div></div>
              ))}
            </div>
            <div className="hero-cta"><Link className="btn btn-primary" href="/contact">Discuss Your Order</Link></div>
          </div>
          <div className="media-stack">
            <img src={assetPath('/assets/images/trust/factory-process.jpg?v=2')} alt="custom bag factory process" />
            <img src={assetPath('/assets/images/trust/factory-exterior.jpg')} alt="custom bag factory exterior" />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><div><span className="badge">Quality Points</span><h2>What we confirm before shipment</h2></div></div>
          <div className="grid grid-4">
            {['Material and color', 'Logo placement', 'Stitching and zipper', 'Packing and labels'].map((item) => <article className="card info-card" key={item}><div className="card-body"><h3>{item}</h3><p className="muted">Checked according to order details and approved sample direction.</p></div></article>)}
          </div>
        </div>
      </section>
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">Live Production</span>
              <h2>Real custom bag production workflow</h2>
              <p>These factory videos show cutting, sewing, quality checking and packing work from the same production base behind Nameer.</p>
            </div>
          </div>
          <div className="video-grid">
            {productionVideos.map(([title, src, text]) => (
              <article className="video-card" key={title}>
                <video src={assetPath(src)} controls preload="metadata" playsInline />
                <div><h3>{title}</h3><p className="muted">{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
