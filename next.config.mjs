const productRedirects = [
  'student-backpack',
  'urban-essential-backpack',
  'women-backpack',
  'mommy-bag',
  'waist-bag',
  'chest-bag',
  'shoulder-bag',
  'mini-crossbody',
  'running-chest-bag',
  'gym-bag',
  'yqjy2286-business-laptop-backpack',
  'yqjy616-business-travel-backpack',
  'yqjy2989-travel-ready-business-backpack',
  'yqjy2977-compact-business-backpack'
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  async redirects() {
    const baseRedirects = [
      { source: '/pages/products.html', destination: '/products', permanent: true },
      { source: '/products.html', destination: '/products', permanent: true },
      { source: '/pages/about.html', destination: '/about', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/pages/factory.html', destination: '/factory', permanent: true },
      { source: '/factory.html', destination: '/factory', permanent: true },
      { source: '/pages/contact.html', destination: '/contact', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/pages/custom-service.html', destination: '/custom-service', permanent: true },
      { source: '/custom-service.html', destination: '/custom-service', permanent: true },
      { source: '/customization', destination: '/custom-service', permanent: true },
      { source: '/customization.html', destination: '/custom-service', permanent: true },
      { source: '/pages/privacy-policy.html', destination: '/privacy-policy', permanent: true },
      { source: '/privacy-policy.html', destination: '/privacy-policy', permanent: true },
      { source: '/blog/oem-vs-odm-bag-manufacturing', destination: '/blog/oem-vs-odm-bags-difference', permanent: true },
      { source: '/blog/custom-backpack-manufacturer-china', destination: 'https://www.custombackpackfactory.com/blog/custom-backpack-manufacturer-china', permanent: true }
    ];

    return [
      ...baseRedirects,
      ...productRedirects.flatMap((slug) => [
        { source: `/pages/product-${slug}.html`, destination: `/products/${slug}`, permanent: true },
        { source: `/product-${slug}.html`, destination: `/products/${slug}`, permanent: true },
        { source: `/product-${slug}`, destination: `/products/${slug}`, permanent: true }
      ])
    ];
  },
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ];
  }
};

export default nextConfig;
