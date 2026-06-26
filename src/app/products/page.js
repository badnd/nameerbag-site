import Link from 'next/link';
import { siteData } from '@/data/site-data';
import { ProductCard } from '@/components/ProductCard';
import { assetPath } from '@/lib/paths';

export const metadata = {
  title: 'Custom Bag Product Catalog',
  description: 'Browse custom backpacks, waist bags, chest bags, mommy bags, shoulder bags and gym bags for OEM/ODM, low MOQ and private label projects.',
  alternates: { canonical: '/products' }
};

export default function ProductsPage() {
  const products = Object.entries(siteData.products);

  return (
    <>
      <section className="section bg-soft">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="badge">Product Catalog</span>
              <h1>Custom bag categories for B2B buyers</h1>
              <p>Each product page is now rendered as static SEO-friendly HTML from one product data layer, so future uploads can be added cleanly.</p>
            </div>
            <Link className="btn btn-primary" href="/contact">Request Quote</Link>
          </div>
          <div className="grid grid-4">
            {siteData.categories.map((category) => (
              <Link className="card category-mini" href={`/products/${category.slug}`} key={category.slug}>
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
              <h2>Available custom bag products</h2>
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
