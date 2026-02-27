import { ImageResponse } from "next/og";
import { ALIBI_CATEGORIES } from "@/lib/alibi-categories";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image({ params }: { params: { slug: string } }) {
    const cat = ALIBI_CATEGORIES.find((c) => c.slug === params.slug);
    const headline = cat?.headline?.split("\n")[0] ?? "Gerar Desculpa Corporativa";
    const label = cat?.title?.split(" ").slice(0, 4).join(" ") ?? "Desculpa Profissional";

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
                    boxSizing: "border-box",
                    fontFamily: "monospace",
                    border: "8px solid #6cf20d",
                }}
            >
                <div style={{ color: "#6cf20d", fontSize: 16, marginBottom: 20, display: "flex" }}>
                    ÁLIBI CORPORATIVO 3000 // {label.toUpperCase()}
                </div>
                <div
                    style={{
                        color: "#ffffff",
                        fontSize: 54,
                        fontWeight: 900,
                        lineHeight: 1.1,
                        marginBottom: 40,
                        maxWidth: 900,
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    {headline}
                </div>
                <div
                    style={{
                        background: "#6cf20d",
                        color: "#0d0d0d",
                        padding: "14px 28px",
                        fontSize: 20,
                        fontWeight: 900,
                        display: "flex",
                    }}
                >
                    GERAR ÁLIBI AGORA →
                </div>
                <div
                    style={{
                        position: "absolute",
                        bottom: 40,
                        right: 80,
                        color: "#444",
                        fontSize: 14,
                        display: "flex",
                    }}
                >
                    alibi.roilabs.com.br/desculpa/{params.slug}
                </div>
            </div>
        ),
        { ...size }
    );
}
