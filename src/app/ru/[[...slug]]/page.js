import { notFound } from 'next/navigation';
import { RuQuoteForm } from '@/components/RuQuoteForm';
import { ruPages, ruShared, ruSite } from '@/data/ru-phase1';
import { RuHomePhase2, RuProductsPage } from '@/components/RuPhase2Sections';

function pageKey(params) {
  return (params?.slug || []).join('/');
}

function pageByParams(params) {
  const key = pageKey(params);
  if (key === 'products') {
    return {
      route: '/ru/products',
      enRoute: '/products',
      title: 'Каталог сумок на заказ | OEM ODM продукция',
      description: 'Русский каталог сумок Nameer: рюкзаки, поясные сумки, сумки для мам, спортивные и дорожные модели. MOQ от 50 шт, запросите расчёт.'
    };
  }
  return ruPages[key];
}

export function generateStaticParams() {
  return [...Object.keys(ruPages), 'products'].map((slug) => ({ slug: slug ? slug.split('/') : [] }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const page = pageByParams(resolvedParams);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.route,
      languages: {
        en: `${ruSite.baseUrl}${page.enRoute === '/' ? '' : page.enRoute}`,
        ru: `${ruSite.baseUrl}${page.route}`,
        'x-default': `${ruSite.baseUrl}${page.enRoute === '/' ? '' : page.enRoute}`
      }
    }
  };
}

export default async function RussianPhaseOnePage({ params, searchParams }) {
  const resolvedParams = await params;
  const key = pageKey(resolvedParams);
  const page = pageByParams(resolvedParams);
  if (!page) notFound();

  if (key === 'products') {
    const resolvedSearchParams = await searchParams;
    return <RuProductsPage activeCategory={resolvedSearchParams?.category || ''} />;
  }

  return (
    <>
      {key === '' ? <RuHomePhase2 /> : null}
      <section className="section bg-soft">
        <div className="container process-grid">
          <div>
            <span className="badge">{page.badge}</span>
            <h1>{page.h1}</h1>
            <p className="muted">{page.intro}</p>
            <div className="feature-list">
              {page.sections.map(([title, text], index) => (
                <div className="feature-item" key={title}>
                  <div className="icon-bubble">{index + 1}</div>
                  <div><strong>{title}</strong><div className="muted">{text}</div></div>
                </div>
              ))}
            </div>
          </div>
          <RuQuoteForm product={ruSite.productPlural} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats">
            {ruShared.trustStats.map((item) => (
              <div key={item}><strong>{item}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container">
          <div className="grid grid-3">
            <article className="card info-card"><div className="card-body"><h2>MOQ</h2><p className="muted">{ruShared.moq}</p></div></article>
            <article className="card info-card"><div className="card-body"><h2>Образец</h2><p className="muted">{ruShared.sample}</p></div></article>
            <article className="card info-card"><div className="card-body"><h2>Сроки</h2><p className="muted">{ruShared.leadTime}</p></div></article>
          </div>
          <div className="cta-banner article-cta">
            <div>
              <h2>Фабрика и экспортная команда</h2>
              <p>{ruShared.factory}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
