import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Álibi Corporativo 3000 — Gerador de Desculpas Profissionais";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "#0d0d0d",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "80px",
                    border: "8px solid #6cf20d",
                    boxSizing: "border-box",
                    fontFamily: "monospace",
                }}
            >
                <div style={{ color: "#6cf20d", fontSize: 18, marginBottom: 24, display: "flex" }}>
          // ALIBI_CORPORATIVO_3000.exe
                </div>
                <div
                    style={{
                        color: "#ffffff",
                        fontSize: 64,
                        fontWeight: 900,
                        lineHeight: 1.05,
                        marginBottom: 32,
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    Fez besteira no trabalho?
                </div>
                <div
                    style={{
                        color: "#6cf20d",
                        fontSize: 36,
                        fontWeight: 700,
                        marginBottom: 48,
                        display: "flex",
                    }}
                >
                    O algoritmo te salva.
                </div>
                <div
                    style={{
                        background: "#6cf20d",
                        color: "#0d0d0d",
                        padding: "16px 32px",
                        fontSize: 22,
                        fontWeight: 900,
                        display: "flex",
                    }}
                >
                    GERAR DESCULPA GRÁTIS →
                </div>
                <div
                    style={{
                        position: "absolute",
                        bottom: 40,
                        right: 80,
                        color: "#444",
                        fontSize: 16,
                        display: "flex",
                    }}
                >
                    alibi.roilabs.com.br
                </div>
            </div>
        ),
        { ...size }
    );
}
