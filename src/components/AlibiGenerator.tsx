"use client";

import { useState } from "react";
import ConfessionInput from "@/components/ConfessionInput";
import GenerateButton from "@/components/GenerateButton";
import LoadingAnimation from "@/components/LoadingAnimation";
import PaywallOverlay from "@/components/PaywallOverlay";
import RevealedResult from "@/components/RevealedResult";
import PixModal from "@/components/PixModal";

type AppState = "idle" | "generating" | "locked" | "paying" | "revealed";

interface AlibiGeneratorProps {
    defaultConfession?: string;
}

/**
 * Extracted client-side generator — used in both the homepage and
 * pSEO landing pages. Landing pages pass a `defaultConfession` to
 * pre-fill the textarea with a relevant example.
 */
export default function AlibiGenerator({ defaultConfession = "" }: AlibiGeneratorProps) {
    const [confession, setConfession] = useState(defaultConfession);
    const [appState, setAppState] = useState<AppState>("idle");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [excuse, setExcuse] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

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
            if (!res.ok) throw new Error(data.error || "Erro ao gerar álibi.");

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
            if (!res.ok) throw new Error(data.error || "Erro ao criar cobrança Pix.");

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
            await fetch("/api/payment/webhook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "payment.updated",
                    data: { id: `mock_pay_${sessionId}` },
                }),
            });

            const revealRes = await fetch("/api/reveal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId }),
            });

            const revealData = await revealRes.json();
            if (!revealRes.ok) throw new Error(revealData.error || "Erro ao revelar álibi.");

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
        setConfession(defaultConfession);
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
        <>
            <div className="flex flex-col gap-6">
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
            </div>

            {appState === "generating" && <LoadingAnimation />}

            {(appState === "locked" || appState === "paying") && (
                <PaywallOverlay
                    onPayClick={handlePayClick}
                    paymentLoading={appState === "paying"}
                />
            )}

            {appState === "revealed" && <RevealedResult excuse={excuse} />}

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
        </>
    );
}
