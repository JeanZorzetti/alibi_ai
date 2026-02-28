import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog-posts-all";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    const title = post?.title ?? "Blog — Álibi Corporativo 3000";
    const category = post?.category ?? "Dicas Corporativas";

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
                    BLOG // {category.toUpperCase()}
                </div>
                <div
                    style={{
                        color: "#ffffff",
                        fontSize: 48,
                        fontWeight: 900,
                        lineHeight: 1.15,
                        marginBottom: 48,
                        maxWidth: 950,
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    {title}
                </div>
                <div
                    style={{
                        color: "#888",
                        fontSize: 18,
                        display: "flex",
                    }}
                >
                    alibi.roilabs.com.br/blog/{slug}
                </div>
            </div>
        ),
        { ...size }
    );
}
