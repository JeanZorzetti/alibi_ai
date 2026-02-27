export default function Header() {
    return (
        <header className="flex flex-col gap-4 text-left border-b-4 border-black pb-8">
            <h1 className="text-brutalist-black text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase font-mono">
                Fez besteira
                <br />
                no trabalho?
                <br />
                <span className="text-primary bg-black px-2 inline-block mt-1">
                    O algoritmo te salva.
                </span>
            </h1>
            <p className="text-gray-700 text-lg md:text-xl font-bold font-mono leading-relaxed max-w-2xl border-l-4 border-primary pl-4 mt-4">
        // Gerador autônomo de desculpas corporativas complexas para atrasos,
                compilações falhas e prazos estourados.
            </p>
        </header>
    );
}
