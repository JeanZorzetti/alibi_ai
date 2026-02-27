interface GenerateButtonProps {
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
}

export default function GenerateButton({
    onClick,
    disabled = false,
    loading = false,
}: GenerateButtonProps) {
    return (
        <div
            className={`flex justify-center md:justify-start ${disabled && !loading ? "opacity-50 pointer-events-none grayscale" : ""
                }`}
        >
            <button
                onClick={onClick}
                disabled={disabled}
                className={`relative group w-full md:w-auto ${disabled ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
            >
                {/* Shadow layer */}
                <div
                    className={`absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 ${!disabled
                            ? "transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
                            : ""
                        }`}
                />
                {/* Button face */}
                <div
                    className={`relative bg-primary border-2 border-black px-8 py-6 flex items-center justify-center gap-3 ${!disabled
                            ? "active:translate-x-1 active:translate-y-1 transition-transform"
                            : ""
                        }`}
                >
                    {loading ? (
                        <>
                            <span className="material-symbols-outlined text-black !text-4xl animate-spin">
                                progress_activity
                            </span>
                            <span className="text-black text-xl md:text-2xl font-black tracking-widest uppercase">
                                PROCESSANDO...
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-black !text-4xl">
                                bolt
                            </span>
                            <span className="text-black text-xl md:text-2xl font-black tracking-widest uppercase">
                                GERAR ÁLIBI IRREFUTÁVEL
                            </span>
                        </>
                    )}
                </div>
            </button>
        </div>
    );
}
