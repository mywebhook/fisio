import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getArticles } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  const base = siteConfig.url;
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...articles.map((a) => ({ url: `${base}/blog/${a.slug}`, lastModified: a.date, changeFrequency: "yearly" as const, priority: 0.6 })),
    { url: `${base}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
