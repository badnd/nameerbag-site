import { siteData } from '@/data/site-data';
import { InquiryForm } from '@/components/InquiryForm';
import { whatsappUrl } from '@/lib/paths';

export const metadata = {
  title: 'Contact Nameer | Custom Bag Factory Quote',
  description: 'Contact Nameer for custom backpack, waist bag, chest bag, mommy bag and gym bag OEM/ODM quotation within 24 hours.',
  alternates: { canonical: '/contact' }
};

export default function ContactPage() {
  return (
    <section className="section bg-soft">
      <div className="container contact-grid">
        <div>
          <span className="badge">Contact Sales</span>
          <h1>Get a custom bag factory quote</h1>
          <p className="muted">Send product type, quantity, logo method and target market. Anna Wei will reply with MOQ tiers, sample and pricing suggestions.</p>
          <div className="contact-mini">
            <div><strong>Email:</strong> <a href={`mailto:${siteData.company.email}`}>{siteData.company.email}</a></div>
            <div><strong>WhatsApp:</strong> <a href={whatsappUrl(siteData)} target="_blank" rel="noopener">{siteData.company.whatsapp}</a></div>
            <div><strong>WeChat:</strong> {siteData.company.wechat}</div>
            <div><strong>Sample fee refund policy:</strong> Sample cost varies with design complexity. For bulk orders of 1,000+ pcs the sample fee is refunded; for 500-1,000 pcs refund is negotiable.</div>
          </div>
        </div>
        <div className="quote-card">
          <div className="feature-item">
            <div className="icon-bubble">A</div>
            <div>
              <strong>Hi, I'm Anna Wei</strong>
              <div className="muted">Your bag sourcing consultant. Send your requirements below and I'll personally reply within 24 hours.</div>
            </div>
          </div>
          <h2>Send Inquiry</h2>
          <InquiryForm productTitle="Contact Page Inquiry" productOptions={siteData.categories.map((category) => category.name)} />
        </div>
      </div>
    </section>
  );
}
