import Link from "next/link";
import type { Metadata } from "next";
import { ALL_POSTS, BLOG_CATEGORIES } from "@/lib/blog-posts-all";

export const metadata: Metadata = {
    title: "Blog — Dicas de Comunicação Corporativa | Álibi Corporativo 3000",
    description: "Artigos sobre comunicação profissional, gestão de projetos, produtividade e humor corporativo para sobreviver ao ambiente de trabalho moderno.",
    alternates: { canonical: "https://alibi.roilabs.com.br/blog" },
    openGraph: {
        title: "Blog — Álibi Corporativo 3000",
        description: "Artigos sobre comunicação profissional, gestão de projetos e humor corporativo.",
        url: "https://alibi.roilabs.com.br/blog",
    },
};

export default function BlogIndex() {
    const byCategory = BLOG_CATEGORIES.map((cat) => ({
        cat,
        posts: ALL_POSTS.filter((p) => p.category === cat),
    }));

    return (
        <main className="min-h-screen bg-[#0d0d0d] text-white font-mono px-4 py-12">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        name: "Blog — Álibi Corporativo 3000",
                        url: "https://alibi.roilabs.com.br/blog",
                        description: "Artigos sobre comunicação profissional e humor corporativo.",
                        publisher: {
                            "@type": "Organization",
                            name: "Álibi Corporativo 3000",
                            url: "https://alibi.roilabs.com.br",
                        },
                    }),
                }}
            />

            <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="text-sm text-[#6cf20d] mb-8" aria-label="Breadcrumb">
                    <Link href="/" className="hover:underline">Início</Link>
                    <span className="mx-2 text-[#444]">/</span>
                    <span className="text-white">Blog</span>
                </nav>

                <header className="mb-12 border-b-4 border-[#6cf20d] pb-8">
                    <p className="text-[#6cf20d] text-sm mb-2">// KNOWLEDGE_BASE.md</p>
                    <h1 className="text-4xl md:text-5xl font-black uppercase">Blog Corporativo</h1>
                    <p className="text-[#aaa] mt-4 text-lg">
                        Guias de sobrevivência para o ambiente de trabalho moderno. {ALL_POSTS.length} artigos.
                    </p>
                </header>

                {byCategory.map(({ cat, posts }) => (
                    <section key={cat} className="mb-16">
                        <h2 className="text-[#6cf20d] text-xs font-bold uppercase tracking-widest mb-6 border-l-4 border-[#6cf20d] pl-3">
                            {cat}
                        </h2>
                        <div className="grid gap-4">
                            {posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group block border border-[#222] hover:border-[#6cf20d] p-5 transition-all"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-bold text-lg group-hover:text-[#6cf20d] transition-colors leading-tight">
                                                {post.title}
                                            </h3>
                                            <p className="text-[#888] text-sm mt-2 line-clamp-2">{post.excerpt}</p>
                                        </div>
                                        <span className="text-[#6cf20d] text-xl shrink-0 group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                    <p className="text-[#444] text-xs mt-3">{post.date}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}
