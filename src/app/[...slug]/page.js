import { notFound } from 'next/navigation';
import { LandingPage } from '@/components/LandingPage';
import { landingPages } from '@/data/landing-pages';
import { siteUrl } from '@/lib/paths';

const russianLandingSlugs = new Set(['custom-waist-bags', 'custom-crossbody-bags', 'custom-cosmetic-bags', 'custom-tote-bags']);

function pageFromParams(params) {
  const slug = (params?.slug || []).join('/');
  return landingPages.find((page) => page.slug === slug);
}

export function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug.split('/') }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const page = pageFromParams(resolvedParams);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `${siteUrl}/${page.slug}`,
      languages: russianLandingSlugs.has(page.slug) ? {
        en: `${siteUrl}/${page.slug}`,
        ru: `${siteUrl}/ru/${page.slug}`,
        'x-default': `${siteUrl}/${page.slug}`
      } : undefined
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/${page.slug}`,
    },
  };
}

export default async function DynamicLandingPage({ params }) {
  const resolvedParams = await params;
  const page = pageFromParams(resolvedParams);
  if (!page) notFound();

  return <LandingPage page={page} />;
}
