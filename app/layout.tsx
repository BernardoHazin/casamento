import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Great_Vibes,
  Mrs_Saint_Delafield,
} from "next/font/google";
import { ToastProvider } from "@/app/components/toast-provider";
import "./globals.css";

const scriptFont = Mrs_Saint_Delafield({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script-family",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes-family",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Isabela & Bernardo — Casamento",
  description:
    "Convite de casamento de Isabela e Bernardo — confirme sua presença e veja todos os detalhes do grande dia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${scriptFont.variable} ${greatVibes.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-foreground">
        <div className="root min-h-full flex flex-col flex-1">{children}</div>
        <ToastProvider />
      </body>
    </html>
  );
}
