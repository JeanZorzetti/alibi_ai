import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { generateExcuse } from "@/lib/gemini";
import { createSession } from "@/lib/session-store";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const confession = body.confession?.trim();

        if (!confession || confession.length < 5) {
            return NextResponse.json(
                { error: "Confissão muito curta. Conte mais sobre a besteira que você fez." },
                { status: 400 }
            );
        }

        if (confession.length > 1000) {
            return NextResponse.json(
                { error: "Confissão muito longa. Seja breve — o algoritmo é eficiente." },
                { status: 400 }
            );
        }

        // Generate the excuse via LLM
        const excuse = await generateExcuse(confession);

        // Create a session — excuse stays server-side
        const sessionId = uuidv4();
        createSession(sessionId, excuse);

        // Return ONLY the sessionId — never the excuse text
        return NextResponse.json({ sessionId });
    } catch (error) {
        console.error("[/api/generate] Error:", error);
        return NextResponse.json(
            { error: "Erro interno no Algoritmo de Sobrevivência. Tente novamente." },
            { status: 500 }
        );
    }
}
