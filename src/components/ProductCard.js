import Link from 'next/link';
import { assetPath, productPath, whatsappUrl } from '@/lib/paths';
import { siteData } from '@/data/site-data';
import { productCardImage } from '@/lib/card-images';

export function ProductCard({ slug, product, showLogoZone = false }) {
  const process = (product.specs || []).find(([name]) => /logo|print|label/i.test(name));
  const processLine = process ? `${process[0]}: ${process[1]}` : 'Logo: Screen print / Embroidery / Patch / Private label';
  return (
    <article className="card product-card">
      <Link className="card-media" href={productPath(slug)}>
        <img src={assetPath(productCardImage(slug))} alt={product.title} loading="lazy" decoding="async" />
        {showLogoZone ? <span className="logo-location-pill">Custom Logo Zone</span> : null}
      </Link>
      <div className="card-body">
        <div className="chip-list">
          {product.badges.slice(0, 3).map((badge) => (
            <span className="badge" key={badge}>{badge}</span>
          ))}
        </div>
        <h3 className="card-title">{product.title}</h3>
        <p className="muted">{product.intro}</p>
        <div className="card-facts">
          <span>MOQ: from 50 pcs*</span>
          <span>Lead Time: Sample 7-15 days · Bulk 15-30 days</span>
          <span>{processLine}</span>
        </div>
        <div className="card-price">{siteData.company.priceText}</div>
      </div>
      <div className="card-actions">
        <Link className="btn btn-primary" href={productPath(slug)}>View Details</Link>
        <a className="btn btn-secondary" href={whatsappUrl(siteData, product)} target="_blank" rel="noopener">Get Quote</a>
      </div>
    </article>
  );
}
