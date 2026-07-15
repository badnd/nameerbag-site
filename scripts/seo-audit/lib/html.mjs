import * as cheerio from "cheerio";

export function parseHtml(body, url) {
  const $ = cheerio.load(body || "");
  $("script,style,noscript,template").remove();
  const text = $("body").text().replace(/\s+/g, " ").trim();
  const links = [];
  $("a[href]").each((_, element) => {
    const href = $(element).attr("href");
    try {
      const resolved = new URL(href, url);
      if (!["http:", "https:"].includes(resolved.protocol)) return;
      resolved.hash = "";
      links.push({ url: resolved.href, href, area: $(element).closest("nav,header,footer").prop("tagName")?.toLowerCase() || "body" });
    } catch {}
  });
  const raw = cheerio.load(body || "");
  const canonical = raw('link[rel="canonical"]').first().attr("href") || "";
  const alternates = {};
  raw('link[rel="alternate"][hreflang]').each((_, element) => {
    const lang = raw(element).attr("hreflang")?.toLowerCase();
    const href = raw(element).attr("href");
    if (lang && href) alternates[lang] = new URL(href, url).href;
  });
  const jsonLd = [];
  raw('script[type="application/ld+json"]').each((_, element) => {
    try { jsonLd.push(JSON.parse(raw(element).text())); } catch (error) { jsonLd.push({ __parseError: String(error) }); }
  });
  return {
    $, raw, text, links, canonical: canonical ? new URL(canonical, url).href : "", alternates, jsonLd,
    title: raw("title").first().text().replace(/\s+/g, " ").trim(),
    description: raw('meta[name="description"]').first().attr("content")?.trim() || "",
    robots: raw('meta[name="robots"]').first().attr("content")?.toLowerCase() || "",
    lang: raw("html").attr("lang")?.toLowerCase() || ""
  };
}

export function flattenJsonLd(value) {
  const output = [];
  const visit = (item) => {
    if (!item || typeof item !== "object") return;
    if (Array.isArray(item)) return item.forEach(visit);
    output.push(item);
    if (item["@graph"]) visit(item["@graph"]);
  };
  visit(value);
  return output;
}
