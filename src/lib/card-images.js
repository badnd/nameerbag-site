const cardProductSlugs = [
  'outdoor-tactical-chest-bag', 'reflective-crossbody-phone-pouch-ytljy5626', 'reflective-crossbody-phone-pouch-slim-ytljy8090a',
  'lightweight-crossbody-bag-ytljy5633', 'ripstop-nylon-mini-crossbody-bag-ytljy5642', 'student-backpack', 'urban-essential-backpack',
  'yqjy2286-business-laptop-backpack', 'yqjy616-business-travel-backpack', 'yqjy2989-travel-ready-business-backpack',
  'yqjy2977-compact-business-backpack', 'women-backpack', 'mommy-bag', 'waist-bag', 'chest-bag', 'shoulder-bag',
  'mini-crossbody', 'running-chest-bag', 'gym-bag', 'crossbody-waist-bag-ytljy944', 'reflective-mini-crossbody-bag-ytljy8083',
  'urban-waist-bag-ytljy6858', 'compact-crossbody-sling-bag-ytljy6825', 'minimalist-flap-crossbody-bag-ytljy6830',
  'custom-waist-bag-ytljy6824', 'custom-sling-bag-ytljy6835', 'compact-crossbody-bag-ytljy5634',
  'compact-crossbody-bag-ytljy956', 'vertical-flap-crossbody-bag-ytljy6840'
];
// The four July mini-crossbody uploads have portrait lifestyle thumbnails. Cards use
// their existing clean product-overview gallery frames instead of altering the galleries.
const productCardOverrides = {
  'reflective-crossbody-phone-pouch-ytljy5626': 'assets/products/ytljy5626/031ef273-808d-46c6-9bff-877257356c33.webp',
  'reflective-crossbody-phone-pouch-slim-ytljy8090a': 'assets/products/ytljy8090a/2dbb5759-00c2-4bca-928f-b0aebfef782b.webp',
  'lightweight-crossbody-bag-ytljy5633': 'assets/products/ytljy5633/617e85d7-b2fa-45d5-bbf8-4b70d4b7fcc1.webp',
  'ripstop-nylon-mini-crossbody-bag-ytljy5642': 'assets/products/ytljy5642/23cd6635-a7fd-437d-a22f-f44e87b89117.webp'
};
export const productCardImage = (slug) => productCardOverrides[slug] ?? `assets/products/${slug}/thumb-card.webp`;
// These replacement images sit among the first visible cards in the Mini
// Crossbody listing. Loading them eagerly avoids a browser lazy-load gap that
// left the card media area blank on mobile while preserving lazy loading for
// the rest of the catalogue.
export const shouldEagerLoadProductCard = (slug) => Object.hasOwn(productCardOverrides, slug);
export const blogCardImage = (index) => productCardImage(cardProductSlugs[index % cardProductSlugs.length]);
