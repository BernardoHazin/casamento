import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GiftCard } from "@/app/components/wedding/gifts/gift-card";
import { PixCard } from "@/app/components/wedding/gifts/pix-card";
import { getPresentes } from "@/lib/presentes";
import { giftListSubtitle } from "@/site.config";

export const metadata: Metadata = {
  title: "Lista de Presentes — Isabela & Bernardo",
  description:
    "Escolha um item da lista para presentear os noivos de forma simbólica.",
};

export const revalidate = 300;

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default async function GiftListPage() {
  const presentes = await getPresentes();

  return (
    <main className="relative mx-auto flex min-h-full w-full max-w-[500px] flex-col overflow-hidden pb-16">
      <div className="pointer-events-none absolute inset-0 z-1">
        <div className="absolute right-0 top-0 opacity-90">
          <Image src="/flower-1.png" alt="" width={200} height={200} priority />
        </div>
      </div>

      <div className="relative z-10 flex flex-col px-5 pt-6 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 self-start font-sans text-xs font-medium uppercase tracking-[0.12em] text-blue-grey/80 transition hover:text-blue-grey"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </Link>

        <header className="mt-8 flex flex-col items-center gap-3 text-center">
          <Image
            src="/gift-2.png"
            alt="Lista de Presentes"
            width={42}
            height={42}
          />

          <h2 className="font-serif text-xl font-semibold text-wedding-slate">
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

          <p className="max-w-[320px] font-serif text-md leading-relaxed text-wedding-slate">
            {giftListSubtitle}
          </p>
        </header>

        <div className="mt-8">
          <PixCard />
        </div>

        {presentes.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4">
            {presentes.map((presente) => (
              <GiftCard key={presente.id} presente={presente} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center font-sans text-sm text-blue-grey">
            Não foi possível carregar a lista agora. Tente novamente em
            instantes.
          </p>
        )}

        <footer className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="font-serif text-sm font-semibold uppercase tracking-[0.16em] text-blue-grey">
            Obrigado por fazer parte desse momento!
          </p>

          <Image src="/heart.png" alt="" width={14} height={14} />

          <Image
            src="/monograma.svg"
            alt="Monograma Isabela & Bernardo"
            width={90}
            height={90}
            className="object-contain"
          />
        </footer>
      </div>
    </main>
  );
}
