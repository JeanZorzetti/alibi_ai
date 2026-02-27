import { NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/session-store";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sessionId } = body;

        if (!sessionId) {
            return NextResponse.json(
                { error: "Sessão inválida." },
                { status: 400 }
            );
        }

        const session = getSession(sessionId);

        if (!session) {
            return NextResponse.json(
                { error: "Sessão expirada ou inexistente. Gere um novo álibi." },
                { status: 404 }
            );
        }

        if (!session.paid) {
            return NextResponse.json(
                { error: "Pagamento não confirmado. Pague para descriptografar." },
                { status: 402 }
            );
        }

        // Payment confirmed — reveal the excuse
        const excuse = session.excuse;

        // Delete session after reveal (one-time use)
        deleteSession(sessionId);

        return NextResponse.json({ excuse });
    } catch (error) {
        console.error("[/api/reveal] Error:", error);
        return NextResponse.json(
            { error: "Erro ao revelar o álibi." },
            { status: 500 }
        );
    }
}
