"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { usePix } from "@/hooks/use-pix";

type PixQrCodeProps = {
  amount?: number;
  size?: number;
};

export function PixQrCode({ amount, size = 96 }: PixQrCodeProps) {
  const { pix } = usePix({ amount });
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(pix, {
      width: size,
      margin: 0,
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setDataUrl(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [pix, size]);

  const boxClass = `relative shrink-0 overflow-hidden rounded-lg border border-wedding-slate/15 bg-white`;

  if (!dataUrl) {
    return (
      <div
        aria-hidden
        className={`${boxClass} animate-pulse bg-cream/50`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div className={boxClass} style={{ width: size, height: size }}>
      {/* Data URL from qrcode — not suitable for next/image */}
      <img
        src={dataUrl}
        alt="QR Code PIX"
        width={size}
        height={size}
        className="h-full w-full object-contain p-1"
      />
    </div>
  );
}
