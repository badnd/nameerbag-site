'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteData } from '@/data/site-data';
import { assetPath, whatsappUrl } from '@/lib/paths';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { PlainEmail } from '@/components/PlainEmail';
import { EmailUsLink } from '@/components/EmailUsLink';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isRu = pathname === '/ru' || pathname?.startsWith('/ru/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', open);
    return () => document.body.classList.remove('mobile-nav-open');
  }, [open]);

  const links = [
    ['Home', '/'],
    ['Products', isRu ? '/ru/products' : '/products'],
    ['Customization', '/custom-service'],
    ['Factory', '/factory'],
    ['About Us', '/about'],
    ['Resources', isRu ? '/ru/resources' : '/resources'],
    ['Blog', '/blog'],
    ['Contact', '/contact']
  ];

  return (
    <>
      <div className="topbar">
        <div className="container">
          <div className="topbar-items">
            <span>Email: <PlainEmail email={siteData.company.email} /></span>
            <span>WhatsApp: {siteData.company.whatsapp}</span>
            <span>WeChat: {siteData.company.wechat}</span>
          </div>
          <div className="topbar-actions">
            <span>OEM / ODM Custom Bag Manufacturer</span>
            <span>Low MOQ - Fast Response</span>
          </div>
        </div>
      </div>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav-wrap">
          <Link href="/" className="brand" aria-label="Nameer home">
            <img className="brand-logo" src={assetPath('/assets/images/brand/nameer-logo-horizontal.png?v=2')} alt="Nameer" />
          </Link>
          <button className="mobile-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">Menu</button>
          <ul className={`nav-links ${open ? 'open' : ''}`}>
            {links.map(([label, href]) => (
              <li key={href}><Link href={href} onClick={() => setOpen(false)}>{label}</Link></li>
            ))}
          </ul>
          <div className="nav-actions">
            <LanguageSwitcher />
            <div className="inquiry-cta-pair">
              <Link className="btn btn-primary" href="/contact">Send Request</Link>
              <EmailUsLink email={siteData.company.email} label="Email Us" className="btn btn-secondary" subject="Inquiry from nameerbag.com" />
            </div>
            <a className="btn btn-primary" href={whatsappUrl(siteData)} target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </header>
    </>
  );
}
