'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { coreI18nRoutes } from '@/lib/i18n';

const enRoutes = Object.keys(coreI18nRoutes);
const ruToEn = Object.fromEntries(Object.entries(coreI18nRoutes).map(([en, ru]) => [ru.replace(/\/$/, '') || '/ru', en]));

function normalize(pathname) {
  if (!pathname || pathname === '/ru') return pathname || '/';
  return pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
}

function getEnglishPath(pathname) {
  const normalized = normalize(pathname);
  if (ruToEn[normalized]) return ruToEn[normalized];
  if (normalized?.startsWith('/ru/')) return normalized.slice(3) || '/';
  return enRoutes.includes(normalized) ? normalized : '/';
}

function getRussianPath(pathname) {
  const englishPath = getEnglishPath(pathname);
  return coreI18nRoutes[englishPath] || '/ru/';
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const englishPath = getEnglishPath(pathname);
  const russianPath = getRussianPath(pathname);
  const isRussian = normalize(pathname)?.startsWith('/ru');

  return (
    <div className="language-switcher" aria-label="Language switcher">
      <Link className={!isRussian ? 'active' : ''} href={englishPath}>EN</Link>
      <span aria-hidden="true">|</span>
      <Link className={isRussian ? 'active' : ''} href={russianPath}>RU</Link>
    </div>
  );
}
