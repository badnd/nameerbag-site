import { mapLimit } from "../lib/context.mjs";

function sameUrl(a, b) {
  const left = new URL(a); const right = new URL(b);
  return left.origin === right.origin && (left.pathname || "/") === (right.pathname || "/") && left.search === right.search;
}

export async function run(ctx) {
  ctx.mark(12, 13, 14, 15, 16, 31, 32);
  const titles = new Map();
  const descriptions = new Map();
  await mapLimit(ctx.urls, ctx.config.runtime.concurrencyPerSite, async (url) => {
    const { response, html } = await ctx.page(url);
    if (!html.canonical) ctx.add(12, "critical", "CANONICAL_MISSING", "Canonical tag is missing", { url });
    else {
      if (!sameUrl(html.canonical, url)) ctx.add(12, "critical", "CANONICAL_NOT_SELF", "Canonical is not self-referencing", { url, actual: html.canonical });
      const target = await ctx.client.request(html.canonical);
      if (target.status !== 200 || target.finalUrl !== html.canonical) ctx.add(12, "critical", "CANONICAL_NOT_200", "Canonical target is not a direct 200", { url, actual: `${target.status} ${target.finalUrl}` });
    }
    for (const lang of ["en", "ru", "x-default"]) if (!html.alternates[lang]) ctx.add(13, "critical", "HREFLANG_MISSING", `Missing hreflang=${lang}`, { url });
    if (url.includes("/ru") && !sameUrl(html.canonical, url)) ctx.add(15, "critical", "RU_CANONICAL", "Russian page canonical must reference itself", { url, actual: html.canonical });
    const expectedLang = new URL(url).pathname.startsWith("/ru") ? "ru" : "en";
    if (!html.lang.startsWith(expectedLang)) ctx.add(16, "warning", "HTML_LANG", `Expected html lang=${expectedLang}`, { url, actual: html.lang || "missing" });
    if (html.robots.includes("noindex") || (response.headers["x-robots-tag"] || "").toLowerCase().includes("noindex")) ctx.add(31, "critical", "UNEXPECTED_NOINDEX", "Sitemap page is marked noindex", { url });
    if (!html.title) ctx.add(32, "critical", "TITLE_MISSING", "Title is missing", { url });
    if (!html.description) ctx.add(32, "warning", "META_DESCRIPTION_MISSING", "Meta description is missing", { url });
    if (html.title) { if (!titles.has(html.title)) titles.set(html.title, []); titles.get(html.title).push(url); }
    if (html.description) { if (!descriptions.has(html.description)) descriptions.set(html.description, []); descriptions.get(html.description).push(url); }
  });
  for (const [value, urls] of titles) if (urls.length > 1) ctx.add(32, "warning", "TITLE_DUPLICATE", `Duplicate title on ${urls.length} pages`, { url: urls[0], actual: `${value} | ${urls.join(", ")}` });
  for (const [value, urls] of descriptions) if (urls.length > 1) ctx.add(32, "warning", "META_DESCRIPTION_DUPLICATE", `Duplicate meta description on ${urls.length} pages`, { url: urls[0], actual: `${value} | ${urls.join(", ")}` });

  await mapLimit(ctx.urls, ctx.config.runtime.concurrencyPerSite, async (url) => {
    const { html } = await ctx.page(url);
    for (const [lang, targetUrl] of Object.entries(html.alternates)) {
      if (!['en', 'ru'].includes(lang)) continue;
      const target = await ctx.page(targetUrl);
      const returnLang = lang === "ru" ? "en" : "ru";
      if (target.response.status !== 200 || target.html.alternates[returnLang] !== url) {
        ctx.add(14, "critical", "HREFLANG_NOT_RECIPROCAL", `${lang} alternate is not reciprocal`, { url, actual: targetUrl });
      }
    }
  });
}
