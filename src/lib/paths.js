export const siteUrl = 'https://www.nameerbag.com';
const defaultAssetBaseUrl = 'https://images.nameerbag.com';
export const assetBaseUrl = (process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? defaultAssetBaseUrl).replace(/\/+$/, '');

export function assetPath(src) {
  if (!src) return '/assets/images/generated/hero-student.webp';
  if (src.startsWith('http')) return src;

  const normalized = `/${src.replace(/^\.?\//, '')}`;
  if (assetBaseUrl && normalized.startsWith('/assets/')) return `${assetBaseUrl}${normalized}`;
  return normalized;
}

export function assetUrl(src) {
  const path = assetPath(src);
  if (path.startsWith('http')) return path;
  return `${siteUrl}${path}`;
}

export function productPath(slug) {
  return `/products/${slug}`;
}

export function productLegacyPath(slug) {
  return `/pages/product-${slug}.html`;
}

export function whatsappUrl(data, product, variant = '') {
  const base = data.company.whatsappLink.split('?')[0];
  const message = product
    ? `Hi, I'm interested in your ${product.title} (${product.model})${variant ? ` - ${variant}` : ''}. Please send MOQ, customization options and quotation.`
    : 'Hi, I am interested in your custom bag products. Please send your product catalog, MOQ, customization options and quotation.';
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function productSchema(data, slug, product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.gallery.map((image) => assetUrl(image)),
    description: product.schemaDescription ?? product.metaDescription ?? product.intro,
    brand: { '@type': 'Brand', name: 'Nameer Bag' },
    sku: product.model,
    manufacturer: { '@type': 'Organization', name: data.company.name },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}${productPath(slug)}`,
      priceCurrency: 'USD',
      price: '0.00',
      description: 'Custom quotation upon request. MOQ 50-500 units depending on product.',
      seller: { '@type': 'Organization', name: data.company.name }
    },
    additionalProperty: product.specs.map(([name, value]) => ({
      '@type': 'PropertyValue',
      name,
      value
    }))
  };
}

export function organizationSchema(data) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.company.name,
    email: data.company.email,
    url: `${siteUrl}/`,
    logo: assetUrl('/assets/images/brand/nameer-logo-horizontal.png?v=2'),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: data.company.whatsapp,
        contactType: 'sales',
        availableLanguage: ['English', 'Chinese']
      }
    ]
  };
}
