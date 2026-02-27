/**
 * Payment helper — Mercado Pago Pix integration (SDK v2).
 *
 * Docs: https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-configuration/payments-via-pix
 * Webhook: https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks
 */

import { MercadoPagoConfig, Payment } from "mercadopago";
import crypto from "crypto";

export interface PixPaymentData {
    qrCode: string;
    qrCodeBase64: string;
    paymentId: string;
    expiresAt: string;
}

function getMPClient(): Payment {
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!token) throw new Error("MERCADOPAGO_ACCESS_TOKEN is not set");
    const client = new MercadoPagoConfig({ accessToken: token });
    return new Payment(client);
}

export async function createPixPayment(
    sessionId: string,
    amountBRL: number = 1.5
): Promise<PixPaymentData> {
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
        console.warn("[Payment] No MP token — using mock");
        return mockPixPayment(sessionId, amountBRL);
    }

    try {
        const payment = getMPClient();

        // Minimum required body for Pix in Mercado Pago:
        // - transaction_amount (number)
        // - payment_method_id: "pix"
        // - payer.email (any valid email)
        // NO CPF/identification needed for Pix < R$10k
        const body = {
            transaction_amount: amountBRL,
            payment_method_id: "pix",
            description: "Alibi Corporativo 3000",
            payer: {
                email: "pagador@email.com",
            },
            metadata: {
                session_id: sessionId,
            },
        };

        console.log("[Payment] Creating Pix charge, body:", JSON.stringify(body));

        const result = await payment.create({
            body,
            requestOptions: {
                // Use timestamp-based key to avoid idempotency conflicts on retries
                idempotencyKey: `${sessionId}-${Date.now()}`,
            },
        });

        console.log("[Payment] MP result status:", result.status);
        console.log("[Payment] MP result id:", result.id);

        const txInfo = result.point_of_interaction?.transaction_data;

        if (!txInfo?.qr_code || !result.id) {
            const errDetail = JSON.stringify(result);
            console.error("[Payment] Missing QR code in response:", errDetail);
            throw new Error(`MP response missing QR data. Status: ${result.status}. Detail: ${errDetail}`);
        }

        return {
            qrCode: txInfo.qr_code,
            qrCodeBase64: txInfo.qr_code_base64 ?? "",
            paymentId: String(result.id),
            expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        };
    } catch (error: unknown) {
        // Log the full MP error for debugging
        if (error && typeof error === "object" && "cause" in error) {
            console.error("[Payment] MP error cause:", JSON.stringify((error as { cause: unknown }).cause));
        }
        console.error("[Payment] Full error:", error);
        throw error;
    }
}

export function validateWebhookSignature(
    headers: Headers,
    body: string,
    xRequestId?: string
): boolean {
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
    if (!secret) {
        console.warn("[Webhook] No secret — skipping validation");
        return true;
    }

    const xSignature = headers.get("x-signature");
    const xRequestIdHeader = xRequestId ?? headers.get("x-request-id") ?? "";

    if (!xSignature) return false;

    const parts = Object.fromEntries(
        xSignature.split(",").map((part) => part.split("=").map((s) => s.trim()) as [string, string])
    );
    const ts = parts["ts"];
    const v1 = parts["v1"];
    if (!ts || !v1) return false;

    let dataId = "";
    try {
        const parsed = JSON.parse(body);
        dataId = String(parsed?.data?.id ?? "");
    } catch {
        return false;
    }

    const manifest = `id:${dataId};request-id:${xRequestIdHeader};ts:${ts};`;
    const hmac = crypto.createHmac("sha256", secret).update(manifest).digest("hex");
    return hmac === v1;
}

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

function mockPixPayment(sessionId: string, amountBRL: number): PixPaymentData {
    return {
        qrCode: `00020126580014BR.GOV.BCB.PIX0136mock-pix-key-${sessionId}520400005303986540${amountBRL.toFixed(2)}5802BR5925ALIBI CORPORATIVO 30006014SAO PAULO SP62070503***6304MOCK`,
        qrCodeBase64: "",
        paymentId: `mock_pay_${sessionId}`,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    };
}
