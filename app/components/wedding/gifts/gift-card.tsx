"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@base-ui/react/button";
import { PresentePixModal } from "@/app/components/wedding/gifts/presente-pix-modal";
import {
  formatPresentePrice,
  PRESENTE_TOTAL_QUOTES,
  type Presente,
} from "@/lib/presentes";

type GiftCardProps = {
  presente: Presente;
};

export function GiftCard({ presente }: GiftCardProps) {
  const [pixOpen, setPixOpen] = useState(false);
  const isSoldOut = presente.quotes === 0;

  return (
    <>
      <article className="flex flex-col items-center rounded-2xl border border-wedding-slate/20 bg-white p-4 shadow-sm">
        <p className="text-center font-sans text-lg font-semibold uppercase tracking-[0.14em] text-blue-grey/70">
          {presente.quotes}/{PRESENTE_TOTAL_QUOTES}
        </p>

        <div className="mx-auto my-3 flex h-40 w-40 items-center justify-center">
          <Image
            src={`/gifts/${presente.icon}.png`}
            alt=""
            width={160}
            height={80}
          />
        </div>

        <h3 className="min-h-14 text-center font-serif text-base leading-snug text-blue-grey">
          {presente.name}
        </h3>

        <svg
          width="150"
          height="10"
          viewBox="0 0 150 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <g clipPath="url(#clip0_0_1)">
            <path
              d="M71.9482 0.625C73.1676 0.625 74.1552 1.72188 74.1552 3.075C74.1552 1.72188 75.1428 0.625 76.3622 0.625C77.5815 0.625 78.5691 1.72188 78.5691 3.075C78.5691 5.11438 76.7848 5.83375 74.3715 9.08C74.3449 9.11565 74.3118 9.14431 74.2744 9.16396C74.2371 9.18362 74.1964 9.1938 74.1552 9.1938C74.114 9.1938 74.0733 9.18362 74.0359 9.16396C73.9986 9.14431 73.9655 9.11565 73.9389 9.08C71.5256 5.83375 69.7412 5.11438 69.7412 3.075C69.7412 1.72188 70.7288 0.625 71.9482 0.625Z"
              fill="#E8753D"
            />
          </g>
          <line
            x1="89.1621"
            y1="3.7"
            x2="149.192"
            y2="3.7"
            stroke="#E8753D"
            strokeOpacity="0.7"
            strokeWidth="0.6"
          />
          <line
            x1="2.31529e-08"
            y1="3.7"
            x2="59.1471"
            y2="3.70001"
            stroke="#E8753D"
            strokeOpacity="0.7"
            strokeWidth="0.6"
          />
          <defs>
            <clipPath id="clip0_0_1">
              <rect
                width="8.82793"
                height="10"
                fill="white"
                transform="translate(69.7412)"
              />
            </clipPath>
          </defs>
        </svg>

        <p className="text-center font-sans text-md font-medium text-blue-grey">
          {formatPresentePrice(presente.price)}
        </p>

        <Button
          type="button"
          disabled={isSoldOut}
          onClick={() => setPixOpen(true)}
          className="mt-4 flex min-h-10 w-full items-center justify-center rounded-xl bg-blue-grey font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white outline-none transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-blue-grey/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100"
        >
          {isSoldOut ? "Esgotado" : "Presentear"}
        </Button>
      </article>

      <PresentePixModal
        presente={presente}
        open={pixOpen}
        onOpenChange={setPixOpen}
      />
    </>
  );
}
