import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/alibi-categories";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://alibicorporativo.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const slugs = getAllSlugs();

    const categoryPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
        url: `${BASE_URL}/desculpa/${slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/desculpa`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        ...categoryPages,
    ];
}
