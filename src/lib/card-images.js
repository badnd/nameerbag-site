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
export const productCardImage = (slug) => `assets/products/${slug}/thumb-card.webp`;
export const blogCardImage = (index) => productCardImage(cardProductSlugs[index % cardProductSlugs.length]);
