import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { assetPath, siteUrl, whatsappUrl } from '@/lib/paths';
import { PlainEmail } from '@/components/PlainEmail';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="footer-logo-panel">
                <img className="brand-logo footer-logo" src={assetPath('/assets/images/brand/nameer-logo-horizontal.png?v=2')} alt="Nameer" />
              </span>
              <small>{siteData.company.tagline}</small>
            </div>
            <p>{siteData.company.name} supplies custom bag solutions for global B2B buyers, including backpacks, waist bags, sling bags, mommy bags and gym bags.</p>
            <p className="muted">Own factory in Baigou, Hebei · Export office in Tianjin</p>
          </div>
          <div>
            <h4>Products</h4>
            <ul>{siteData.categories.map((category) => <li key={category.slug}><Link href={`${siteUrl}/products/${category.slug}`}>{category.name}</Link></li>)}</ul>
            <h4 className="footer-subhead">Custom Solutions</h4>
            <ul>
              <li><Link href="/custom-waist-bags">Custom Waist Bags</Link></li>
              <li><Link href="/custom-crossbody-bags">Custom Crossbody Bags</Link></li>
              <li><Link href="/custom-cosmetic-bags">Custom Cosmetic Bags</Link></li>
              <li><Link href="/custom-tote-bags">Custom Tote Bags</Link></li>
            </ul>
          </div>
          <div>
            <h4>Buyer Service</h4>
            <ul>
              <li><Link href="/custom-service">OEM / ODM Service</Link></li>
              <li><Link href="/factory">Factory Strength</Link></li>
              <li><Link href="/products">Product Catalog</Link></li>
              <li><Link href="/blog">Buying Guides</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>Email: <PlainEmail email={siteData.company.email} /></li>
              <li>WhatsApp: <a href={whatsappUrl(siteData)} target="_blank" rel="noopener">{siteData.company.whatsapp}</a></li>
              <li>WeChat: {siteData.company.wechat}</li>
              <li>{siteData.company.priceText}</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom"><span>&copy; {year} {siteData.company.name}. All rights reserved.</span></div>
      </footer>
      <a className="floating-wa" href={whatsappUrl(siteData)} target="_blank" rel="noopener" aria-label="WhatsApp inquiry">WA</a>
      <div className="floating-label">WhatsApp Inquiry</div>
      <div className="mobile-contact-bar">
        <a className="btn btn-secondary" href={`mailto:${siteData.company.email}`}>Email</a>
        <a className="btn btn-primary" href={whatsappUrl(siteData)} target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </>
  );
}
