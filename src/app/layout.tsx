import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Álibi Corporativo 3000 — Gerador de Desculpas Profissionais",
  description: "Fez besteira no trabalho? O algoritmo te salva. Gerador autônomo de desculpas corporativas complexas para atrasos, compilações falhas e prazos estourados.",
  keywords: ["desculpa corporativa", "gerador de desculpas", "álibi profissional", "desculpa para atraso", "erro no trabalho"],
  metadataBase: new URL("https://alibi.roilabs.com.br"),
  alternates: { canonical: "https://alibi.roilabs.com.br" },
  openGraph: {
    title: "Álibi Corporativo 3000",
    description: "Fez besteira no trabalho? O algoritmo te salva.",
    type: "website",
    locale: "pt_BR",
    url: "https://alibi.roilabs.com.br",
    siteName: "Álibi Corporativo 3000",
  },
  twitter: {
    card: "summary_large_image",
    title: "Álibi Corporativo 3000",
    description: "Fez besteira no trabalho? O algoritmo te salva.",
  },
};

const schemaWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Álibi Corporativo 3000",
  url: "https://alibi.roilabs.com.br",
  description: "Gerador autônomo de desculpas corporativas complexas.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://alibi.roilabs.com.br/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const schemaApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Álibi Corporativo 3000",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  url: "https://alibi.roilabs.com.br",
  offers: { "@type": "Offer", price: "1.50", priceCurrency: "BRL" },
  description: "Gerador de desculpas corporativas com IA e pagamento via Pix.",
  inLanguage: "pt-BR",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebSite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaApp) }} />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <nav className="border-b border-[#222] px-4 py-2 flex gap-6 text-xs font-mono text-[#666]">
          <Link href="/" className="hover:text-[#6cf20d] transition-colors">INÍCIO</Link>
          <Link href="/desculpa" className="hover:text-[#6cf20d] transition-colors">CATEGORIAS</Link>
          <Link href="/blog" className="hover:text-[#6cf20d] transition-colors">BLOG</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
