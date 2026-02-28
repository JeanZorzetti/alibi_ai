// Correct merge script: creates a single self-contained blog-posts-all.ts
// Run: node scripts/merge-blog.mjs

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const srcLib = join(__dir, "../src/lib");

const main = readFileSync(join(srcLib, "blog-posts.ts"), "utf8");
const extra = readFileSync(join(srcLib, "blog-posts-extra.ts"), "utf8");

// Extract entries from BLOG_POSTS array in blog-posts.ts
// Array starts after "BLOG_POSTS: BlogPost[] = [" and ends at "];\n\nexport const ALL_POSTS"
const mainStart = main.indexOf("export const BLOG_POSTS: BlogPost[] = [\n");
const mainEnd = main.indexOf("\n];\n\nexport const ALL_POSTS");
if (mainStart === -1 || mainEnd === -1) {
    throw new Error(`Could not extract main entries. mainStart=${mainStart} mainEnd=${mainEnd}`);
}
const mainEntries = main.slice(mainStart + "export const BLOG_POSTS: BlogPost[] = [\n".length, mainEnd);

// Extract entries from EXTRA_BLOG_POSTS array in blog-posts-extra.ts
// Array starts after "EXTRA_BLOG_POSTS: BlogPost[] = [\n" and ends at last "];\n"
const extraStart = extra.indexOf("export const EXTRA_BLOG_POSTS: BlogPost[] = [\n");
const extraEnd = extra.lastIndexOf("\n];");
if (extraStart === -1 || extraEnd === -1) {
    throw new Error(`Could not extract extra entries. extraStart=${extraStart} extraEnd=${extraEnd}`);
}
const extraEntries = extra.slice(extraStart + "export const EXTRA_BLOG_POSTS: BlogPost[] = [\n".length, extraEnd);

console.log("Main entries chars:", mainEntries.length);
console.log("Extra entries chars:", extraEntries.length);

const merged = `// AUTO-MERGED — single self-contained file, no cross-file blog imports
// All 69 articles defined here. Regenerate with: node scripts/merge-blog.mjs

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    category: string;
    faqs: { question: string; answer: string }[];
    keywords: string[];
}

export const ALL_POSTS: BlogPost[] = [
${mainEntries},
${extraEntries}
];

export function getPostBySlug(slug: string): BlogPost | undefined {
    return ALL_POSTS.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
    return ALL_POSTS.map((p) => p.slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
    return ALL_POSTS.filter((p) => p.category === category);
}

export const BLOG_CATEGORIES = [...new Set(ALL_POSTS.map((p) => p.category))];
`;

const outPath = join(srcLib, "blog-posts-all.ts");
writeFileSync(outPath, merged, "utf8");
console.log("✅ Written to blog-posts-all.ts, total chars:", merged.length);
