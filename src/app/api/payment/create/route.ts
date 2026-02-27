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

        console.log("[payment/create] MP token set:", Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN));

        const pixData = await createPixPayment(sessionId, 1.5);
        return NextResponse.json(pixData);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        // Expose error detail to help debug — remove after fixing
        const cause = (error as { cause?: unknown })?.cause;
        console.error("[/api/payment/create] Error:", message, cause);
        return NextResponse.json(
            { error: "Erro ao criar cobrança Pix.", detail: message, cause: JSON.stringify(cause) },
            { status: 500 }
        );
    }
}
