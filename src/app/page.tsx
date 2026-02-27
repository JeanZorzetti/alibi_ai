"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ConfessionInput from "@/components/ConfessionInput";
import GenerateButton from "@/components/GenerateButton";
import LoadingAnimation from "@/components/LoadingAnimation";
import PaywallOverlay from "@/components/PaywallOverlay";
import RevealedResult from "@/components/RevealedResult";
import PixModal from "@/components/PixModal";

type AppState = "idle" | "generating" | "locked" | "paying" | "revealed";

export default function Home() {
  const [confession, setConfession] = useState("");
  const [appState, setAppState] = useState<AppState>("idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [excuse, setExcuse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Pix modal
  const [showPixModal, setShowPixModal] = useState(false);
  const [pixQrCode, setPixQrCode] = useState("");
  const [pixQrCodeBase64, setPixQrCodeBase64] = useState("");
  const [simulatingPayment, setSimulatingPayment] = useState(false);

  const handleGenerate = async () => {
    if (!confession.trim() || confession.trim().length < 5) {
      setError("Confesse algo com pelo menos 5 caracteres. Sem medo.");
      return;
    }

    setError(null);
    setAppState("generating");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confession: confession.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao gerar álibi.");
      }

      setSessionId(data.sessionId);
      setAppState("locked");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
      setAppState("idle");
    }
  };

  const handlePayClick = async () => {
    if (!sessionId) return;

    setAppState("paying");
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao criar cobrança Pix.");
      }

      setPixQrCode(data.qrCode);
      setPixQrCodeBase64(data.qrCodeBase64 ?? "");
      setShowPixModal(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro no pagamento.");
      setAppState("locked");
    }
  };

  const handleSimulatePayment = async () => {
    if (!sessionId) return;

    setSimulatingPayment(true);
    try {
      // 1. Simulate webhook (mark as paid)
      await fetch("/api/payment/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "payment.updated",
          data: { id: `mock_pay_${sessionId}` },
        }),
      });

      // 2. Reveal the excuse
      const revealRes = await fetch("/api/reveal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const revealData = await revealRes.json();

      if (!revealRes.ok) {
        throw new Error(revealData.error || "Erro ao revelar álibi.");
      }

      setExcuse(revealData.excuse);
      setShowPixModal(false);
      setAppState("revealed");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro na revelação.");
    } finally {
      setSimulatingPayment(false);
    }
  };

  const handleReset = () => {
    setConfession("");
    setAppState("idle");
    setSessionId(null);
    setExcuse("");
    setError(null);
    setShowPixModal(false);
    setPixQrCode("");
    setPixQrCodeBase64("");
  };

  const isInputDisabled = appState !== "idle";

  return (
    <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        <Header />

        <main className="flex flex-col gap-6">
          <ConfessionInput
            value={confession}
            onChange={setConfession}
            disabled={isInputDisabled}
            readOnly={appState !== "idle"}
          />

          {error && (
            <div className="bg-alert-red/10 border-2 border-alert-red text-alert-red font-mono text-sm p-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          <GenerateButton
            onClick={handleGenerate}
            disabled={isInputDisabled}
            loading={appState === "generating"}
          />
        </main>

        {/* Loading State */}
        {appState === "generating" && <LoadingAnimation />}

        {/* Locked/Paywall State */}
        {(appState === "locked" || appState === "paying") && (
          <PaywallOverlay
            onPayClick={handlePayClick}
            paymentLoading={appState === "paying"}
          />
        )}

        {/* Revealed State */}
        {appState === "revealed" && <RevealedResult excuse={excuse} />}

        {/* Reset button */}
        {appState === "revealed" && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleReset}
              className="font-mono text-sm text-gray-500 hover:text-black border-b-2 border-dashed border-gray-300 hover:border-black transition-colors pb-1 cursor-pointer uppercase tracking-wider"
            >
              {`>`} Gerar outro álibi
            </button>
          </div>
        )}

        {/* pSEO category links — internal linking + discovery */}
        <div className="border-t-2 border-black pt-6">
          <p className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-4">
            // casos comuns cobertos pelo algoritmo:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { slug: "atraso-em-deploy-de-codigo", label: "Deploy atrasado" },
              { slug: "bug-em-producao", label: "Bug em produção" },
              { slug: "prazo-estourado-projeto", label: "Prazo estourado" },
              { slug: "esqueci-reuniao-com-cliente", label: "Reunião esquecida" },
              { slug: "relatorio-financeiro-com-erro", label: "Erro em relatório" },
            ].map(({ slug, label }) => (
              <a
                key={slug}
                href={`/desculpa/${slug}`}
                className="font-mono text-xs border border-gray-300 hover:border-black hover:bg-primary px-3 py-1.5 transition-colors uppercase tracking-wider"
              >
                {label}
              </a>
            ))}
            <a
              href="/desculpa"
              className="font-mono text-xs border-2 border-black bg-black text-primary hover:bg-primary hover:text-black px-3 py-1.5 transition-colors uppercase tracking-wider"
            >
              + Ver todas
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center font-mono text-xs text-gray-400 border-t border-gray-300 pt-6 mt-4 space-y-1">
          <p>ÁLIBI CORPORATIVO 3000 © {new Date().getFullYear()}</p>
          <p>
            // Nenhum gestor foi enganado na produção deste software. Ou foi.
          </p>
        </footer>
      </div>

      {/* Pix Payment Modal */}
      {showPixModal && (
        <PixModal
          qrCode={pixQrCode}
          qrCodeBase64={pixQrCodeBase64}
          onClose={() => {
            setShowPixModal(false);
            setAppState("locked");
          }}
          onSimulatePayment={handleSimulatePayment}
          simulatingPayment={simulatingPayment}
        />
      )}
    </div>
  );
}
