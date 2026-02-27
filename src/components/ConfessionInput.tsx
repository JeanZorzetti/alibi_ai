interface ConfessionInputProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    readOnly?: boolean;
}

export default function ConfessionInput({
    value,
    onChange,
    disabled = false,
    readOnly = false,
}: ConfessionInputProps) {
    return (
        <div className="relative group">
            {/* Brutalist shadow offset */}
            <div className="absolute -inset-1 bg-black translate-x-2 translate-y-2" />
            <div className="relative bg-white border-2 border-black p-1">
                <label className="sr-only" htmlFor="excuse-input">
                    Descreva o problema
                </label>
                <textarea
                    className={`w-full min-h-[200px] resize-none bg-surface border-0 text-brutalist-black placeholder:text-gray-500 text-xl font-mono p-6 focus:ring-0 focus:outline-none ${readOnly ? "opacity-75" : ""
                        }`}
                    id="excuse-input"
                    placeholder="> Confesse o que você deixou de fazer e quem está te cobrando..._"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    disabled={disabled}
                    readOnly={readOnly}
                    maxLength={1000}
                />
            </div>
        </div>
    );
}
