import Image from "next/image";
import { Button } from "@base-ui/react/button";
import {
  GIFT_SECTION_MESSAGE,
  giftGridImages,
  giftListUrl,
} from "@/site.config";
import { IconGift } from "./icons";

export function GiftListSection() {
  return (
    <section className="bg-gift-panel px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-8 text-center">
        <IconGift className="h-10 w-10 text-terracotta" />

        <h2 className="font-serif text-3xl font-semibold tracking-[0.12em] text-wedding-slate sm:text-4xl">
          LISTA DE PRESENTES
        </h2>

        <div className="h-16 w-16 sm:h-20 sm:w-20">
          <Image
            src="/gift.png"
            alt=""
            width={160}
            height={160}
            className="h-full w-full object-contain"
          />
        </div>

        <p className="max-w-full font-sans text-base leading-relaxed text-foreground/85 sm:text-lg">
          {GIFT_SECTION_MESSAGE}
        </p>

        <div className="grid w-full max-w-full grid-cols-2 gap-4 sm:grid-cols-4">
          {giftGridImages.map((item) => (
            <div
              key={item.src}
              className="flex aspect-square items-center justify-center rounded-2xl bg-white/70 p-3 shadow-sm ring-1 ring-wedding-slate/10"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={120}
                height={120}
                className="h-auto w-[72%] max-w-[120px] object-contain"
              />
            </div>
          ))}
        </div>

        <Button
          nativeButton={false}
          render={
            <a
              href={giftListUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-wedding-slate px-10 font-sans text-sm font-semibold uppercase tracking-wide text-white shadow-sm outline-none transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-wedding-slate/40 focus-visible:ring-offset-2 focus-visible:ring-offset-gift-panel"
            />
          }
        >
          Ver lista completa
        </Button>
      </div>
    </section>
  );
}
