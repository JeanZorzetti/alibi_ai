/**
 * Payment helper — Mercado Pago Pix integration (SDK v2).
 *
 * Docs: https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-configuration/payments-via-pix
 * Webhook: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
 *
 * Required env vars:
 *   MERCADOPAGO_ACCESS_TOKEN   Your test or production token
 *   MERCADOPAGO_WEBHOOK_SECRET Optional — for signature validation
 */

import { MercadoPagoConfig, Payment } from "mercadopago";
import crypto from "crypto";

export interface PixPaymentData {
    qrCode: string;          // Pix copia-e-cola string
    qrCodeBase64: string;    // Base64 image of QR code
    paymentId: string;       // Mercado Pago payment ID
    expiresAt: string;       // ISO timestamp
}

function getMPClient(): Payment {
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!token) {
        throw new Error("MERCADOPAGO_ACCESS_TOKEN is not set");
    }
    const client = new MercadoPagoConfig({ accessToken: token });
    return new Payment(client);
}

/**
 * Creates a Pix payment (Mercado Pago).
 * If MERCADOPAGO_ACCESS_TOKEN is not set, falls back to mock for dev.
 */
export async function createPixPayment(
    sessionId: string,
    amountBRL: number = 1.5
): Promise<PixPaymentData> {
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
        console.warn("[Payment] MERCADOPAGO_ACCESS_TOKEN not set — using mock");
        return mockPixPayment(sessionId, amountBRL);
    }

    try {
        const payment = getMPClient();

        const result = await payment.create({
            body: {
                transaction_amount: amountBRL,
                payment_method_id: "pix",
                description: `Alibi Corporativo 3000 - Sessao ${sessionId}`,
                payer: {
                    email: "cliente@alibicoporativo.com.br",
                    first_name: "Cliente",
                    last_name: "Corporativo",
                    identification: {
                        type: "CPF",
                        number: "19119119100",
                    },
                },
                metadata: {
                    session_id: sessionId,
                },
                date_of_expiration: new Date(
                    Date.now() + 30 * 60 * 1000
                ).toISOString(),
            },
            requestOptions: {
                idempotencyKey: sessionId,
            },
        });

        const txInfo = result.point_of_interaction?.transaction_data;

        if (!txInfo?.qr_code || !result.id) {
            throw new Error("Mercado Pago did not return QR code data");
        }

        return {
            qrCode: txInfo.qr_code,
            qrCodeBase64: txInfo.qr_code_base64 ?? "",
            paymentId: String(result.id),
            expiresAt: result.date_of_expiration ?? new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        };
    } catch (error) {
        console.error("[Payment] Mercado Pago error:", error);
        throw error;
    }
}

/**
 * Verifies Mercado Pago webhook signature (x-signature header).
 * See: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks#bookmark_validar_origem_das_notificacoes
 */
export function validateWebhookSignature(
    headers: Headers,
    body: string,
    xRequestId?: string
): boolean {
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
    if (!secret) {
        console.warn("[Webhook] MERCADOPAGO_WEBHOOK_SECRET not set — skipping validation");
        return true;
    }

    const xSignature = headers.get("x-signature");
    const xRequestIdHeader = xRequestId ?? headers.get("x-request-id") ?? "";

    if (!xSignature) return false;

    // Parse: "ts=...,v1=..."
    const parts = Object.fromEntries(
        xSignature.split(",").map((part) => part.split("=").map((s) => s.trim()) as [string, string])
    );
    const ts = parts["ts"];
    const v1 = parts["v1"];
    if (!ts || !v1) return false;

    // Get payment ID from body
    let dataId = "";
    try {
        const parsed = JSON.parse(body);
        dataId = String(parsed?.data?.id ?? "");
    } catch {
        return false;
    }

    // Build manifest string
    const manifest = `id:${dataId};request-id:${xRequestIdHeader};ts:${ts};`;
    const hmac = crypto.createHmac("sha256", secret).update(manifest).digest("hex");

    return hmac === v1;
}

/**
 * Gets the payment status and extracts session_id from metadata.
 */
export async function getPaymentStatus(
    paymentId: string
): Promise<{ status: string; sessionId: string | null }> {
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
        return { status: "approved", sessionId: paymentId.replace("mock_pay_", "") };
    }

    const payment = getMPClient();
    const result = await payment.get({ id: paymentId });

    return {
        status: result.status ?? "unknown",
        sessionId: (result.metadata?.session_id as string) ?? null,
    };
}

// ──────────────────────────────────────────────
// Mock for development (no MP token)
// ──────────────────────────────────────────────
function mockPixPayment(sessionId: string, amountBRL: number): PixPaymentData {
    return {
        qrCode: `00020126580014BR.GOV.BCB.PIX0136mock-pix-key-${sessionId}520400005303986540${amountBRL.toFixed(2)}5802BR5925ALIBI CORPORATIVO 30006014SAO PAULO SP62070503***6304MOCK`,
        qrCodeBase64: "",
        paymentId: `mock_pay_${sessionId}`,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };
}
