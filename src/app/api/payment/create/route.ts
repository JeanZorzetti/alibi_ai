import { NextResponse } from "next/server";
import { getSession } from "@/lib/session-store";
import { createPixPayment } from "@/lib/payment";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sessionId } = body;

        if (!sessionId) {
            return NextResponse.json({ error: "Sessão inválida." }, { status: 400 });
        }

        const session = getSession(sessionId);
        if (!session) {
            return NextResponse.json(
                { error: "Sessão expirada. Gere um novo álibi." },
                { status: 404 }
            );
        }

        const pixData = await createPixPayment(sessionId, 1.5);

        return NextResponse.json(pixData);
    } catch (error) {
        console.error("[/api/payment/create] Error:", error);
        return NextResponse.json({ error: "Erro ao criar cobrança Pix." }, { status: 500 });
    }
}
