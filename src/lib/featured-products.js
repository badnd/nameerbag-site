// Fixed homepage featured capacity: Nameer 6. Do not maintain homepage slug arrays for new products.
export const FEATURED_PRODUCT_CAPACITY = 6;

export function selectFeaturedProducts(products, legacySlugs = []) {
  const legacyRank = new Map(legacySlugs.map((slug, index) => [slug, index]));

  return Object.entries(products)
    .filter(([slug, product]) => product.publishedAt || legacyRank.has(slug))
    .sort(([slugA, productA], [slugB, productB]) => {
      const dateA = Date.parse(productA.publishedAt || '') || 0;
      const dateB = Date.parse(productB.publishedAt || '') || 0;
      if (dateA !== dateB) return dateB - dateA;
      if (dateA) return slugA.localeCompare(slugB);
      return legacyRank.get(slugA) - legacyRank.get(slugB);
    })
    .slice(0, FEATURED_PRODUCT_CAPACITY);
}
