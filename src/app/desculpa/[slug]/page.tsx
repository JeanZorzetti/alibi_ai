import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getAllSlugs, ALIBI_CATEGORIES } from "@/lib/alibi-categories";
import AlibiGenerator from "@/components/AlibiGenerator";

/**
 * Pre-generate all slugs at build time (SSG).
 * When you add new categories to alibi-categories.ts or DB,
 * they'll be picked up on next build / ISR revalidation.
 */
export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

/**
 * Dynamic metadata per page (for SEO).
 */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);

    if (!category) return { title: "Página não encontrada" };

    return {
        title: `${category.title} | Álibi Corporativo 3000`,
        description: category.metaDescription,
        keywords: category.keywords,
        openGraph: {
            title: category.ogTitle ?? category.title,
            description: category.metaDescription,
            type: "website",
            locale: "pt_BR",
        },
        alternates: {
            canonical: `/desculpa/${slug}`,
        },
    };
}

export default async function AlibiCategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);

    if (!category) notFound();

    const [headlineFirst, ...headlineRest] = category.headline.split("\n");

    return (
        <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
                {/* Breadcrumb */}
                <nav className="font-mono text-xs uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Link href="/" className="hover:text-black transition-colors">
                        Álibi Corp 3000
                    </Link>
                    <span>/</span>
                    <Link href="/desculpa" className="hover:text-black transition-colors">
                        Categorias
                    </Link>
                    <span>/</span>
                    <span className="text-black">{slug}</span>
                </nav>

                {/* Hero (SEO H1) */}
                <header className="flex flex-col gap-4 text-left border-b-4 border-black pb-8">
                    <h1 className="text-brutalist-black text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase font-mono">
                        {headlineFirst}
                        {headlineRest.length > 0 && (
                            <>
                                <br />
                                {headlineRest.map((line, i) =>
                                    i === headlineRest.length - 1 ? (
                                        <span key={i} className="text-primary bg-black px-2 inline-block mt-1">
                                            {line}
                                        </span>
                                    ) : (
                                        <span key={i}>
                                            {line}
                                            <br />
                                        </span>
                                    )
                                )}
                            </>
                        )}
                    </h1>
                    <p className="text-gray-700 text-lg md:text-xl font-bold font-mono leading-relaxed max-w-2xl border-l-4 border-primary pl-4 mt-4">
            // {category.description}
                    </p>
                </header>

                {/* Interactive generator (uses first example as default) */}
                <main>
                    <AlibiGenerator defaultConfession={category.examples[0]} />
                </main>

                {/* Related examples — good for internal linking + long-tail SEO */}
                <section className="border-t-2 border-black pt-8">
                    <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4">
            // exemplos de situações nesta categoria:
                    </h2>
                    <ul className="flex flex-col gap-3">
                        {category.examples.map((example, i) => (
                            <li key={i} className="font-mono text-sm text-gray-700 border-l-2 border-primary pl-4 py-1">
                                {`>`} {example}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Other categories — internal linking */}
                <section className="border-t-2 border-black pt-8">
                    <h2 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4">
            // outras situações corporativas cobertas:
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {ALIBI_CATEGORIES.filter((c) => c.slug !== slug)
                            .slice(0, 4)
                            .map((c) => (
                                <Link
                                    key={c.slug}
                                    href={`/desculpa/${c.slug}`}
                                    className="group relative"
                                >
                                    <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                                    <div className="relative bg-white border-2 border-black p-4 font-mono text-sm hover:bg-primary transition-colors">
                                        <span className="material-symbols-outlined text-sm align-middle mr-1">
                                            arrow_forward
                                        </span>
                                        {c.title}
                                    </div>
                                </Link>
                            ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center font-mono text-xs text-gray-400 border-t border-gray-300 pt-6 mt-4 space-y-1">
                    <p>ÁLIBI CORPORATIVO 3000 © {new Date().getFullYear()}</p>
                    <p>// Nenhum gestor foi enganado na produção deste software. Ou foi.</p>
                </footer>
            </div>
        </div>
    );
}
