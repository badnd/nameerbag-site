import { siteUrl } from '@/lib/paths';

export const coreI18nRoutes = {
  '/': '/ru/',
  '/custom-service': '/ru/custom-service',
  '/factory': '/ru/factory',
  '/about': '/ru/about',
  '/contact': '/ru/contact'
};

export function i18nAlternates(route) {
  const enPath = route === '/' ? '' : route;
  const ruPath = coreI18nRoutes[route] || '/ru/';

  return {
    canonical: route,
    languages: {
      en: `${siteUrl}${enPath}`,
      ru: `${siteUrl}${ruPath}`,
      'x-default': `${siteUrl}${enPath}`
    }
  };
}
