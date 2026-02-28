import type { MetadataRoute } from "next";
import { ALIBI_CATEGORIES } from "@/lib/alibi-categories";
import { getAllPostSlugs } from "@/lib/blog-posts-all";

const BASE_URL = "https://alibi.roilabs.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date().toISOString();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/desculpa`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.9,
        },
    ];

    const categoryRoutes: MetadataRoute.Sitemap = ALIBI_CATEGORIES.map((cat) => ({
        url: `${BASE_URL}/desculpa/${cat.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const blogRoutes: MetadataRoute.Sitemap = getAllPostSlugs().map((slug) => ({
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...categoryRoutes, ...blogRoutes];
}
