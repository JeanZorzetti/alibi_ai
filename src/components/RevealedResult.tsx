"use client";

import { useState } from "react";

interface RevealedResultProps {
    excuse: string;
}

export default function RevealedResult({ excuse }: RevealedResultProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(excuse);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch {
            // Fallback for older browsers
            const ta = document.createElement("textarea");
            ta.value = excuse;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }
    };

    return (
        <section className="relative mt-8 animate-matrix-fade">
            {/* Decorative green glow background */}
            <div className="absolute -inset-1 bg-primary/20 -skew-y-1" />

            <div className="relative bg-white border-4 border-success-green shadow-brutalist p-0 overflow-hidden flex flex-col md:flex-row">
                {/* Excuse text area */}
                <div className="flex-1 p-8 bg-[#f0fff4]">
                    <div className="font-mono text-xs uppercase tracking-widest text-success-green mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">lock_open</span>
                        ACCESS_GRANTED_LEVEL_99
                    </div>
                    <p className="font-mono text-xl md:text-2xl leading-relaxed text-black font-medium whitespace-pre-line">
                        {excuse}
                    </p>
                </div>

                {/* Copy button section */}
                <div className="md:w-1/3 bg-black p-6 flex flex-col items-center justify-center gap-4 border-t-4 md:border-t-0 md:border-l-4 border-success-green">
                    <button
                        onClick={handleCopy}
                        className="relative group w-full cursor-pointer active:scale-95 transition-transform"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-x-2 translate-y-2" />
                        <div
                            className={`relative border-2 border-white p-6 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all ${copied ? "bg-success-green" : "bg-alert-red"
                                }`}
                        >
                            <span className="material-symbols-outlined text-white !text-5xl mb-2">
                                {copied ? "check_circle" : "content_copy"}
                            </span>
                            <span className="text-white text-xl font-black tracking-tighter uppercase leading-none">
                                {copied ? (
                                    <>
                                        COPIADO
                                        <br />
                                        COM SUCESSO
                                    </>
                                ) : (
                                    <>
                                        COPIAR
                                        <br />E SOBREVIVER
                                    </>
                                )}
                            </span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Success badge */}
            <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-success-green font-bold font-mono text-sm uppercase tracking-wider bg-white border border-success-green inline-block px-3 py-1 shadow-[2px_2px_0px_0px_#008000]">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Pagamento confirmado. Álibi descriptografado com sucesso.
            </div>
        </section>
    );
}
