"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@base-ui/react/button";
import {
  formatPresentePrice,
  getPresenteCategory,
  getPresenteIcon,
  type Presente,
} from "@/lib/presentes";
import { pix } from "@/site.config";
import { IconHeart } from "../icons";

type GiftCardProps = {
  presente: Presente;
};

export function GiftCard({ presente }: GiftCardProps) {
  const [copied, setCopied] = useState(false);
  const icon = getPresenteIcon(presente.name);
  const category = getPresenteCategory(presente.name);

  async function handlePresentear() {
    const message = `${pix.key} — ${presente.name} (${formatPresentePrice(presente.price)})`;

    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="flex flex-col rounded-2xl border border-wedding-slate/20 bg-white p-4 shadow-sm">
      <p className="text-center font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-grey/70">
        {category}
      </p>

      <div className="mx-auto my-3 flex h-16 w-16 items-center justify-center">
        <Image
          src={icon}
          alt=""
          width={64}
          height={64}
          className="h-14 w-14 object-contain"
        />
      </div>

      <h3 className="min-h-[3.5rem] text-center font-serif text-base leading-snug text-blue-grey">
        {presente.name}
      </h3>

      <IconHeart className="mx-auto my-2 h-3.5 w-3.5 text-terracotta" />

      <p className="text-center font-sans text-sm font-medium text-foreground/85">
        {formatPresentePrice(presente.price)}
      </p>

      <Button
        type="button"
        onClick={handlePresentear}
        className="mt-4 flex min-h-10 w-full items-center justify-center rounded-xl bg-blue-grey font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white outline-none transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-blue-grey/40 focus-visible:ring-offset-2"
      >
        {copied ? "Copiado!" : "Presentear"}
      </Button>
    </article>
  );
}
