import { Metadata } from "next";
import Link from "next/link";
import { ALIBI_CATEGORIES } from "@/lib/alibi-categories";

export const metadata: Metadata = {
    title: "Categorias de Desculpas Corporativas | Álibi Corporativo 3000",
    description:
        "Navegue por todas as categorias de desculpas corporativas: atrasos em deploy, reuniões esquecidas, bugs em produção, prazos estourados e muito mais.",
};

export default function AlibiIndexPage() {
    return (
        <div className="min-h-screen bg-bg-light p-4 sm:p-8">
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
                {/* Header */}
                <header className="flex flex-col gap-4 text-left border-b-4 border-black pb-8">
                    <nav className="font-mono text-xs uppercase tracking-widest text-gray-500">
                        <Link href="/" className="hover:text-black transition-colors">
                            Álibi Corp 3000
                        </Link>
                        {" / "}
                        <span className="text-black">Categorias</span>
                    </nav>
                    <h1 className="text-brutalist-black text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase font-mono">
                        Escolha sua
                        <br />
                        <span className="text-primary bg-black px-2 inline-block mt-1">
                            categoria de besteira
                        </span>
                    </h1>
                    <p className="text-gray-700 text-lg font-bold font-mono leading-relaxed max-w-2xl border-l-4 border-primary pl-4 mt-2">
            // Selecione a situação mais próxima da sua tragédia corporativa e gere uma desculpa irrefutável.
                    </p>
                </header>

                {/* Category grid */}
                <main>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {ALIBI_CATEGORIES.map((category) => (
                            <Link key={category.slug} href={`/desculpa/${category.slug}`} className="group relative">
                                {/* Shadow */}
                                <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
                                {/* Card */}
                                <div className="relative bg-white border-2 border-black p-6 flex flex-col gap-3 h-full transition-colors group-hover:bg-surface">
                                    <div className="font-mono text-xs uppercase tracking-widest text-gray-400">
                                        /desculpa/{category.slug}
                                    </div>
                                    <h2 className="font-black text-brutalist-black text-lg leading-tight uppercase">
                                        {category.title}
                                    </h2>
                                    <p className="font-mono text-sm text-gray-600 leading-relaxed flex-1">
                                        {category.metaDescription}
                                    </p>
                                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-200">
                                        <div className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                                            {category.examples.length} exemplos
                                        </div>
                                        <div className="flex items-center gap-1 text-sm font-bold uppercase font-mono group-hover:text-primary transition-colors">
                                            Gerar álibi
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </main>

                {/* CTA to homepage */}
                <div className="border-t-2 border-black pt-8 text-center font-mono">
                    <p className="text-gray-600 text-sm mb-4">
            // Não encontrou sua situação? Use o gerador livre:
                    </p>
                    <Link href="/" className="group relative inline-block">
                        <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                        <div className="relative bg-primary border-2 border-black px-8 py-4 font-black uppercase tracking-widest text-sm">
                            <span className="material-symbols-outlined text-sm align-middle mr-2">bolt</span>
                            Gerador Livre
                        </div>
                    </Link>
                </div>

                {/* Footer */}
                <footer className="text-center font-mono text-xs text-gray-400 border-t border-gray-300 pt-6 mt-4 space-y-1">
                    <p>ÁLIBI CORPORATIVO 3000 © {new Date().getFullYear()}</p>
                    <p>// Nenhum gestor foi enganado na produção deste software. Ou foi.</p>
                </footer>
            </div>
        </div>
    );
}
