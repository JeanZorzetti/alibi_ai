import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Álibi Corporativo 3000 — Gerador de Desculpas Profissionais",
  description:
    "Fez besteira no trabalho? O algoritmo te salva. Gerador autônomo de desculpas corporativas complexas para atrasos, compilações falhas e prazos estourados.",
  keywords: [
    "desculpa corporativa",
    "gerador de desculpas",
    "álibi profissional",
    "desculpa para atraso",
    "erro no trabalho",
  ],
  openGraph: {
    title: "Álibi Corporativo 3000",
    description: "Fez besteira no trabalho? O algoritmo te salva.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
