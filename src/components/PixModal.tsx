"use client";

interface PixModalProps {
    qrCode: string;
    qrCodeBase64: string;
    onClose: () => void;
    onSimulatePayment: () => void;
    simulatingPayment: boolean;
}

export default function PixModal({
    qrCode,
    qrCodeBase64,
    onClose,
    onSimulatePayment,
    simulatingPayment,
}: PixModalProps) {
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(qrCode);
        } catch {
            /* silent */
        }
    };

    const isDev = process.env.NODE_ENV === "development";
    const hasRealQR = Boolean(qrCodeBase64);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="relative max-w-lg w-full">
                {/* Brutalist shadow */}
                <div className="absolute inset-0 bg-primary translate-x-3 translate-y-3" />

                <div className="relative bg-white border-4 border-black p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-black text-white hover:bg-gray-800 border-2 border-black cursor-pointer transition-colors"
                        aria-label="Fechar"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center gap-2 bg-black text-primary px-4 py-2 font-mono text-xs uppercase tracking-widest">
                            <span className="material-symbols-outlined text-sm">qr_code_2</span>
                            PAGAMENTO PIX
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight">
                            Escaneie para salvar sua pele
                        </h2>
                    </div>

                    {/* QR Code — real image if available, placeholder if not */}
                    <div className="mx-auto w-52 h-52 bg-white border-4 border-black flex items-center justify-center p-2">
                        {hasRealQR ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={`data:image/png;base64,${qrCodeBase64}`}
                                alt="QR Code Pix"
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center gap-2">
                                <span className="material-symbols-outlined !text-6xl text-gray-400">qr_code_2</span>
                                <span className="font-mono text-xs text-gray-400 text-center">
                                    Adicione MERCADOPAGO_ACCESS_TOKEN para gerar QR real
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Pix copia-e-cola */}
                    <div className="space-y-2">
                        <label className="font-mono text-xs uppercase tracking-widest text-gray-600">
                            Pix Copia e Cola:
                        </label>
                        <div
                            className="bg-gray-100 border-2 border-black p-3 font-mono text-xs break-all select-all cursor-pointer hover:bg-gray-200 transition-colors"
                            onClick={copyToClipboard}
                            title="Clique para copiar"
                        >
                            {qrCode}
                        </div>
                        <button
                            onClick={copyToClipboard}
                            className="w-full font-mono text-xs text-gray-500 hover:text-black border-b border-dashed border-gray-300 hover:border-black transition-colors pb-1 cursor-pointer flex items-center justify-center gap-1"
                        >
                            <span className="material-symbols-outlined text-sm">content_copy</span>
                            Copiar código
                        </button>
                    </div>

                    {/* Amount */}
                    <div className="text-center font-mono text-sm text-gray-600">
                        Valor:{" "}
                        <span className="text-2xl font-black text-black bg-primary px-2">
                            R$ 1,50
                        </span>
                    </div>

                    {/* DEV ONLY: simulate payment */}
                    {isDev && (
                        <div className="border-t-2 border-dashed border-gray-300 pt-4">
                            <p className="text-xs font-mono text-gray-400 text-center mb-2 uppercase">
                                ⚠ Modo desenvolvimento — simular pagamento
                            </p>
                            <button
                                onClick={onSimulatePayment}
                                disabled={simulatingPayment}
                                className="w-full bg-success-green hover:bg-green-700 text-white py-3 px-4 border-2 border-black font-bold uppercase tracking-wider text-sm transition-colors cursor-pointer disabled:opacity-50"
                            >
                                {simulatingPayment ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined animate-spin text-sm">
                                            progress_activity
                                        </span>
                                        Confirmando pagamento...
                                    </span>
                                ) : (
                                    "✓ Simular Pagamento Confirmado"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
