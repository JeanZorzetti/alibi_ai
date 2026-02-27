"use client";

import { useState, useEffect } from "react";

const FAKE_WORDS = [
    "sincronização", "pipeline", "redundância", "cluster", "compilação",
    "homologação", "deploy", "staging", "sprint", "backlog",
    "refatoração", "orquestração", "container", "microserviço", "endpoint",
    "latência", "throughput", "assincronicidade", "gargalo", "kernel",
    "entropia", "deadlock", "rollback", "middleware", "hotfix",
    "stakeholder", "deliverable", "milestone", "sprint", "retrospectiva",
];

function generateFakeText(): string {
    const paragraphs = [];
    for (let p = 0; p < 3; p++) {
        const sentenceCount = 2 + Math.floor(Math.random() * 2);
        const sentences = [];
        for (let s = 0; s < sentenceCount; s++) {
            const wordCount = 12 + Math.floor(Math.random() * 15);
            const words = [];
            for (let w = 0; w < wordCount; w++) {
                words.push(FAKE_WORDS[Math.floor(Math.random() * FAKE_WORDS.length)]);
            }
            words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
            sentences.push(words.join(" ") + ".");
        }
        paragraphs.push(sentences.join(" "));
    }
    return paragraphs.join("\n\n");
}

interface PaywallOverlayProps {
    onPayClick: () => void;
    paymentLoading?: boolean;
}

export default function PaywallOverlay({
    onPayClick,
    paymentLoading = false,
}: PaywallOverlayProps) {
    const [fakeText, setFakeText] = useState("");

    useEffect(() => {
        setFakeText(generateFakeText());
    }, []);

    return (
        <section className="relative mt-8 group">
            {/* Decorative skewed background */}
            <div className="absolute -inset-1 bg-gray-200 -skew-y-1" />

            <div className="relative bg-white border-2 border-black p-8 overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 border-b-2 border-black pb-4 mb-6 font-mono text-xs uppercase tracking-widest text-gray-500">
                    <span className="w-3 h-3 bg-red-500 rounded-full border border-black" />
                    <span className="w-3 h-3 bg-yellow-500 rounded-full border border-black" />
                    <span className="w-3 h-3 bg-green-500 rounded-full border border-black" />
                    <span className="ml-auto">Output_Log_v3.0.txt</span>
                </div>

                {/* Fake blurred text — NOT the real excuse */}
                <div
                    aria-hidden="true"
                    className="blur-text font-mono text-lg leading-relaxed select-none opacity-50 pointer-events-none whitespace-pre-line"
                >
                    {fakeText || "Carregando dados criptografados..."}
                </div>

                {/* Paywall overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[2px] z-10 p-4">
                    <div className="bg-surface border-2 border-black shadow-brutalist-heavy max-w-md w-full p-6 flex flex-col gap-4 text-center">
                        <div className="mx-auto bg-black text-primary p-3 rounded-full border-2 border-primary w-16 h-16 flex items-center justify-center">
                            <span className="material-symbols-outlined !text-4xl">lock</span>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-black uppercase leading-tight">
                                Desculpa corporativa de alta eficácia gerada com sucesso.
                            </h3>
                            <p className="text-sm font-mono text-gray-600 border-t border-black pt-2">
                                Pague{" "}
                                <span className="bg-primary text-black px-1 font-bold">
                                    R$ 1,50
                                </span>{" "}
                                via Pix Automático para descriptografar e copiar.
                            </p>
                        </div>
                        <button
                            onClick={onPayClick}
                            disabled={paymentLoading}
                            className="group relative w-full mt-2 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-primary/30 animate-pulse" />
                            <div className="relative flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white py-4 px-4 border-2 border-primary transition-colors">
                                {paymentLoading ? (
                                    <>
                                        <span className="material-symbols-outlined text-primary animate-spin">
                                            progress_activity
                                        </span>
                                        <span className="font-bold uppercase tracking-wider text-sm md:text-base">
                                            Gerando Pix...
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-primary">
                                            qr_code_2
                                        </span>
                                        <span className="font-bold uppercase tracking-wider text-sm md:text-base">
                                            Pagar com Pix e Salvar Minha Pele
                                        </span>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
