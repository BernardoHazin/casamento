"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@base-ui/react/button";
import { pix } from "@/site.config";

export function PixCard() {
  const [copied, setCopied] = useState(false);

  async function handleCopyPixKey() {
    try {
      await navigator.clipboard.writeText(pix.key);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="w-full rounded-2xl border border-wedding-slate/20 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <p className="flex-1 font-sans text-sm leading-relaxed text-foreground/80">
          {pix.instructions}
        </p>

        {pix.qrCodeImage ? (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-wedding-slate/15 bg-white">
            <Image
              src={pix.qrCodeImage}
              alt="QR Code PIX"
              fill
              className="object-contain p-1"
              sizes="96px"
            />
          </div>
        ) : (
          <div
            aria-hidden
            className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed border-wedding-slate/25 bg-cream/50 text-[10px] uppercase tracking-wide text-wedding-slate/50"
          >
            QR Code
          </div>
        )}
      </div>

      <Button
        type="button"
        onClick={handleCopyPixKey}
        className="mt-5 flex min-h-11 w-full items-center justify-center rounded-xl bg-blue-grey font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white outline-none transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-blue-grey/40 focus-visible:ring-offset-2"
      >
        {copied ? "Chave copiada!" : "Copiar chave PIX"}
      </Button>
    </div>
  );
}
