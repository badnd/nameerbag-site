import './globals.css';
import Script from 'next/script';
import { headers } from 'next/headers';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { siteData } from '@/data/site-data';
import { JsonLd } from '@/components/JsonLd';
import { assetPath, organizationSchema } from '@/lib/paths';

export const metadata = {
  metadataBase: new URL('https://www.nameerbag.com'),
  title: {
    default: 'Custom Bag Manufacturer | OEM ODM Backpack & Bag Supplier',
    template: '%s | Nameer'
  },
  description: 'Custom bags and cases manufacturer for B2B buyers. OEM/ODM backpacks, waist bags, mommy bags, chest bags and gym bags with low MOQ, 7-15 day samples and contact for best price.',
  openGraph: {
    type: 'website',
    siteName: 'Nameer',
    images: [assetPath('/assets/images/trust/factory-process.jpg?v=2')]
  },
  twitter: {
    card: 'summary_large_image',
    images: [assetPath('/assets/images/trust/factory-process.jpg?v=2')]
  },
  icons: {
    icon: assetPath('/assets/images/brand/nameer-icon-32.png?v=2'),
    apple: assetPath('/assets/images/brand/nameer-icon-180.png?v=2')
  },
  verification: {
    google: 'LNngjZCe-ntyTk4u11vkXimEeA4P8yu30dl3PkACSUQ',
    other: {
      'msvalidate.01': 'AD12B57AA450C181C4A8D6F90403CA06',
      'yandex-verification': '243dab0457fabae2'
    }
  }
};

export default async function RootLayout({ children }) {
  const requestHeaders = await headers();
  const pathname = requestHeaders.get('x-pathname') || '';
  const lang = pathname.startsWith('/ru') ? 'ru' : 'en';

  return (
    <html lang={lang}>
      <body>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${siteData.analytics.ga4}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteData.analytics.ga4}');
        `}</Script>
        <JsonLd data={organizationSchema(siteData)} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
