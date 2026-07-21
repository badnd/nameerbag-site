import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { ProductCard } from '@/components/ProductCard';
import { assetPath } from '@/lib/paths';
import { i18nAlternates } from '@/lib/i18n';
import { JsonLd } from '@/components/JsonLd';
import { assetUrl, productPath, siteUrl } from '@/lib/paths';

export const metadata = {
  title: 'Custom Bag Product Catalog',
  description: 'Browse custom backpacks, waist bags, chest bags, mommy bags, shoulder bags and gym bags for OEM/ODM, low MOQ and private label projects.',
  alternates: i18nAlternates('/products')
};

function matchesCategory(slug, product, activeCategory) {
  if (!activeCategory) return true;
  return slug === activeCategory || slug.includes(activeCategory) || (product.category || '').toLowerCase().includes(activeCategory.replaceAll('-', ' '));
}

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const activeCategory = params?.category || '';
  const activeCategoryName = siteData.categories.find((category) => category.slug === activeCategory)?.name;
  const products = Object.entries(siteData.products).filter(([slug, product]) => matchesCategory(slug, product, activeCategory));
  const collectionUrl = `${siteUrl}/products${activeCategory ? `?category=${encodeURIComponent(activeCategory)}` : ''}`;
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: activeCategoryName ? `${activeCategoryName} products` : 'Custom bag product catalog',
    url: collectionUrl,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map(([slug, product], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}${productPath(slug)}`,
        name: product.title,
        image: assetUrl(product.hero)
      }))
    }
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">Product Catalog</span>
              <h1>{activeCategoryName || 'Custom bag categories for B2B buyers'}</h1>
              <p>Each product page is now rendered as static SEO-friendly HTML from one product data layer, so future uploads can be added cleanly.</p>
            </div>
            <Link className="btn btn-primary" href="/contact">Request Quote</Link>
          </div>
          <div className="filter-row">
            <Link className={`filter-pill ${!activeCategory ? 'is-active' : ''}`} href="/products">All Products</Link>
            {siteData.categories.map((category) => (
              <Link className={`filter-pill ${activeCategory === category.slug ? 'is-active' : ''}`} href={`/products?category=${category.slug}`} key={category.slug}>{category.name}</Link>
            ))}
          </div>
          <div className="grid grid-4">
            {siteData.categories.map((category) => (
              <Link className="card category-mini" href={`/products?category=${category.slug}`} key={category.slug}>
                <img src={assetPath(category.image)} alt={category.name} />
                <strong>{category.name}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">All Items</span>
              <h2>{activeCategoryName ? `${activeCategoryName} products` : 'Available custom bag products'}</h2>
              <p>Designed for importers, wholesalers, corporate buyers and private label brands.</p>
            </div>
          </div>
          <div className="grid grid-3">
            {products.map(([slug, product]) => <ProductCard key={slug} slug={slug} product={product} showLogoZone />)}
          </div>
        </div>
      </section>
    </>
  );
}
