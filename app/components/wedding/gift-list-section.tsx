import Image from "next/image";
import Link from "next/link";
import { Button } from "@base-ui/react/button";
import { giftListUrl } from "@/site.config";

export function GiftListSection() {
  return (
    <section className="bg-gift-panel px-6 py-6">
      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/gift-2.png"
            alt="Lista de Presentes"
            width={42}
            height={42}
          />

          <h2 className="font-cormorant-sc text-xl font-semibold text-wedding-slate">
            Lista de Presentes
          </h2>

          <svg
            width="150"
            height="10"
            viewBox="0 0 150 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
        </div>

        <p className="font-serif text-sm text-wedding-slate max-w-[282px]">
          A sua presença já é o melhor presente, mas se desejar nos presentear,
          preparamos uma lista com carinho.
        </p>

        <Button
          nativeButton={false}
          render={
            <Link
              href={giftListUrl}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-wedding-slate px-10 font-sans text-sm font-semibold uppercase tracking-wide text-white shadow-sm outline-none transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-wedding-slate/40 focus-visible:ring-offset-2 focus-visible:ring-offset-gift-panel"
            />
          }
        >
          Ver lista de presentes
        </Button>
      </div>
    </section>
  );
}
