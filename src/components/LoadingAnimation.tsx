"use client";

import { useState, useEffect } from "react";

const LOADING_MESSAGES = [
    "Analisando nível de besteira...",
    "Consultando base de jargões corporativos...",
    "Calculando entropia da desculpa...",
    "Compilando álibis no pipeline...",
    "Otimizando verbosidade técnica...",
    "Gerando kernel panic fictício...",
    "Injetando buzzwords no relatório...",
    "Sincronizando com o servidor de mentiras...",
    "Criptografando rastros de incompetência...",
    "Deploy da desculpa em andamento...",
];

export default function LoadingAnimation() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [dots, setDots] = useState("");

    useEffect(() => {
        const msgInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        }, 2000);

        const dotInterval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        }, 400);

        return () => {
            clearInterval(msgInterval);
            clearInterval(dotInterval);
        };
    }, []);

    return (
        <section className="relative mt-8">
            <div className="absolute -inset-1 bg-black translate-x-2 translate-y-2" />
            <div className="relative bg-brutalist-black border-2 border-primary p-8 animate-pulse-glow">
                {/* Terminal header */}
                <div className="flex items-center gap-2 border-b border-primary/30 pb-4 mb-6 font-mono text-xs uppercase tracking-widest text-primary/60">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
                    <span className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }} />
                    <span className="ml-auto">PROCESSING_ALIBI.exe</span>
                </div>

                {/* Matrix-style loading */}
                <div className="font-mono text-primary space-y-3">
                    <div className="text-sm opacity-60">
                        {`>`} Inicializando Algoritmo de Sobrevivência Corporativa v3.0...
                    </div>
                    <div className="text-sm opacity-80">
                        {`>`} {LOADING_MESSAGES[messageIndex]}{dots}
                    </div>
                    <div className="text-lg font-bold mt-4 animate-cursor-blink inline-block">
                        █
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-6 h-2 bg-black border border-primary/30 overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-1000 ease-linear"
                        style={{
                            width: "100%",
                            animation: "progress-indeterminate 2s ease-in-out infinite",
                        }}
                    />
                </div>
                <style jsx>{`
          @keyframes progress-indeterminate {
            0% { width: 0%; margin-left: 0%; }
            50% { width: 60%; margin-left: 20%; }
            100% { width: 0%; margin-left: 100%; }
          }
        `}</style>
            </div>
        </section>
    );
}
