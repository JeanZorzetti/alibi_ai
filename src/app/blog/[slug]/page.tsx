import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug, getAllPostSlugs, ALL_POSTS } from "@/lib/blog-posts-all";

export function generateStaticParams() {
    return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = getPostBySlug(params.slug);
    if (!post) return { title: "Não encontrado" };

    const url = `https://alibi.roilabs.com.br/blog/${post.slug}`;
    return {
        title: `${post.title} | Álibi Corporativo 3000`,
        description: post.excerpt,
        keywords: post.keywords,
        alternates: { canonical: url },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url,
            type: "article",
            publishedTime: post.date,
        },
    };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);
    if (!post) notFound();

    const related = ALL_POSTS.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);
    const url = `https://alibi.roilabs.com.br/blog/${post.slug}`;

    const schemaArticle = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        url,
        author: { "@type": "Organization", name: "Álibi Corporativo 3000" },
        publisher: { "@type": "Organization", name: "Álibi Corporativo 3000", url: "https://alibi.roilabs.com.br" },
        keywords: post.keywords.join(", "),
    };

    const schemaFAQ = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };

    const schemaBreadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "https://alibi.roilabs.com.br" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://alibi.roilabs.com.br/blog" },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
    };

    const paragraphs = post.content.split("\n\n");

    return (
        <main className="min-h-screen bg-[#0d0d0d] text-white font-mono px-4 py-12">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFAQ) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumb) }} />

            <div className="max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <nav className="text-sm text-[#6cf20d] mb-8">
                    <Link href="/" className="hover:underline">Início</Link>
                    <span className="mx-2 text-[#444]">/</span>
                    <Link href="/blog" className="hover:underline">Blog</Link>
                    <span className="mx-2 text-[#444]">/</span>
                    <span className="text-[#888] truncate">{post.category}</span>
                </nav>

                {/* Header */}
                <header className="mb-10 border-b-4 border-[#6cf20d] pb-8">
                    <span className="text-[#6cf20d] text-xs font-bold uppercase tracking-widest">{post.category}</span>
                    <h1 className="text-3xl md:text-4xl font-black mt-2 leading-tight">{post.title}</h1>
                    <p className="text-[#888] mt-4 text-lg">{post.excerpt}</p>
                    <time className="text-[#444] text-sm mt-3 block">{post.date}</time>
                </header>

                {/* Content */}
                <article className="prose-invert prose-headings:text-[#6cf20d] max-w-none space-y-4 text-[#ccc] leading-relaxed">
                    {paragraphs.map((p, i) => {
                        if (p.startsWith("## ")) return <h2 key={i} className="text-[#6cf20d] text-xl font-bold mt-8 mb-2">{p.slice(3)}</h2>;
                        if (p.startsWith("### ")) return <h3 key={i} className="text-white text-lg font-bold mt-6 mb-1">{p.slice(4)}</h3>;
                        if (p.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-[#6cf20d] pl-4 text-[#aaa] italic">{p.slice(2)}</blockquote>;
                        return <p key={i}>{p}</p>;
                    })}
                </article>

                {/* FAQ Section */}
                <section className="mt-16 border-t border-[#222] pt-10">
                    <h2 className="text-[#6cf20d] text-sm font-bold uppercase tracking-widest mb-6">Perguntas Frequentes</h2>
                    <div className="space-y-6">
                        {post.faqs.map((faq, i) => (
                            <div key={i} className="border border-[#222] p-5 hover:border-[#6cf20d] transition-colors">
                                <h3 className="font-bold text-white mb-2">{faq.question}</h3>
                                <p className="text-[#888] text-sm">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-12 border-4 border-[#6cf20d] p-6 text-center">
                    <p className="text-[#6cf20d] text-sm font-bold uppercase mb-2">// Precisa de uma desculpa agora?</p>
                    <p className="text-white font-black text-2xl mb-4">Gere seu álibi corporativo em segundos</p>
                    <Link
                        href="/"
                        className="inline-block bg-[#6cf20d] text-[#0d0d0d] font-black px-8 py-3 text-lg hover:bg-white transition-colors"
                    >
                        GERAR DESCULPA GRÁTIS →
                    </Link>
                </div>

                {/* Related */}
                {related.length > 0 && (
                    <section className="mt-12 border-t border-[#222] pt-10">
                        <h2 className="text-[#6cf20d] text-xs font-bold uppercase tracking-widest mb-6">Artigos Relacionados</h2>
                        <div className="grid gap-4">
                            {related.map((rp) => (
                                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group flex items-center justify-between border border-[#222] p-4 hover:border-[#6cf20d] transition-all">
                                    <span className="text-sm group-hover:text-[#6cf20d] transition-colors">{rp.title}</span>
                                    <span className="text-[#6cf20d] group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
