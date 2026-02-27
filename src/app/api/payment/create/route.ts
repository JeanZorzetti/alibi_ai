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

        // Debug: log env var presence (never log the actual value)
        console.log("[payment/create] MP token set:", Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN));
        console.log("[payment/create] Token length:", process.env.MERCADOPAGO_ACCESS_TOKEN?.length ?? 0);

        const pixData = await createPixPayment(sessionId, 1.5);

        return NextResponse.json(pixData);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("[/api/payment/create] Error:", message);

        // Return the actual error message in non-production or when it's safe
        return NextResponse.json(
            {
                error: "Erro ao criar cobrança Pix.",
                detail: process.env.NODE_ENV !== "production" ? message : undefined,
            },
            { status: 500 }
        );
    }
}
