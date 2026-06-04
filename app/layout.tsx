import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Cormorant_SC,
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

const cormorantSc = Cormorant_SC({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant-sc-family",
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
      className={`${scriptFont.variable} ${greatVibes.variable} ${cormorant.variable} ${cormorantSc.variable} h-full w-full antialiased`}
    >
      <body className="flex min-h-full w-full flex-col text-foreground">
        <div className="root flex min-h-full w-full flex-1 flex-col mx-auto max-w-[500px]">
          {children}
        </div>
        <ToastProvider />
      </body>
    </html>
  );
}
