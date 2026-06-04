"use client";

import Image from "next/image";
import { Button } from "@base-ui/react/button";
import { PixQrCode } from "@/app/components/wedding/gifts/pix-qr-code";
import { usePix } from "@/hooks/use-pix";
import { pix } from "@/site.config";

export function PixCard() {
  const { copy } = usePix();

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
          <PixQrCode />
        )}
      </div>

      <Button
        type="button"
        onClick={() => void copy()}
        className="mt-5 flex cursor-pointer min-h-11 w-full items-center justify-center rounded-xl bg-blue-grey font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white outline-none transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-blue-grey/40 focus-visible:ring-offset-2"
      >
        Copiar código PIX
      </Button>
    </div>
  );
}
