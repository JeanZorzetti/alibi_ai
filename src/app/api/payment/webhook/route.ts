import { NextResponse } from "next/server";
import { markAsPaid, getSession } from "@/lib/session-store";
import { validateWebhookSignature, getPaymentStatus } from "@/lib/payment";

/**
 * Mercado Pago webhook handler.
 *
 * MP sends notifications for events like "payment.updated".
 * We check if payment is "approved" and then mark the session as paid.
 *
 * Docs: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
 */
export async function POST(request: Request) {
    let rawBody = "";

    try {
        rawBody = await request.text();
        const body = JSON.parse(rawBody);

        // Validate signature (uses HMAC when MERCADOPAGO_WEBHOOK_SECRET is set)
        const xRequestId = request.headers.get("x-request-id") ?? undefined;
        if (!validateWebhookSignature(request.headers, rawBody, xRequestId)) {
            return NextResponse.json({ error: "Assinatura inválida." }, { status: 401 });
        }

        // MP IPN / Webhook format:
        // { action: "payment.updated", data: { id: "123456789" } }
        const action = body.action as string | undefined;
        const paymentId = String(body.data?.id ?? "");

        // Only process payment events
        if (!action?.startsWith("payment") || !paymentId) {
            return NextResponse.json({ status: "ignored" });
        }

        // Get payment status and linked session_id from MP
        const { status, sessionId } = await getPaymentStatus(paymentId);

        if (status !== "approved") {
            console.log(`[Webhook] Payment ${paymentId} status: ${status} — not approved yet`);
            return NextResponse.json({ status: "pending" });
        }

        if (!sessionId) {
            console.error(`[Webhook] Payment ${paymentId} has no session_id in metadata`);
            return NextResponse.json({ error: "session_id não encontrado no metadata." }, { status: 422 });
        }

        const session = getSession(sessionId);
        if (!session) {
            // Session may have expired — log and continue
            console.warn(`[Webhook] Session ${sessionId} not found (may have expired)`);
            return NextResponse.json({ status: "session_expired" });
        }

        markAsPaid(sessionId);
        console.log(`[Webhook] ✅ Payment ${paymentId} approved — session ${sessionId} unlocked`);

        return NextResponse.json({ status: "ok", sessionId });
    } catch (error) {
        console.error("[/api/payment/webhook] Error:", error);
        return NextResponse.json({ error: "Erro ao processar webhook." }, { status: 500 });
    }
}
