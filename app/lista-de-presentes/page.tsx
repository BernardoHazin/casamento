import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GiftCard } from "@/app/components/wedding/gifts/gift-card";
import { PixCard } from "@/app/components/wedding/gifts/pix-card";
import { IconGift, IconHeart } from "@/app/components/wedding/icons";
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
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
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
    <main className="relative mx-auto flex min-h-full w-full max-w-[500px] flex-col bg-gift-panel px-5 pb-16 pt-6 sm:px-8">
      <div className="pointer-events-none absolute right-0 top-0 w-28 opacity-90 sm:w-32">
        <Image
          src="/flower-1.png"
          alt=""
          width={160}
          height={160}
          className="h-auto w-full object-contain"
          priority
        />
      </div>

      <Link
        href="/"
        className="relative z-10 inline-flex items-center gap-1 self-start font-sans text-xs font-medium uppercase tracking-[0.12em] text-blue-grey/80 transition hover:text-blue-grey"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar
      </Link>

      <header className="relative z-10 mt-8 flex flex-col items-center gap-3 text-center">
        <IconGift className="h-9 w-9 text-blue-grey" />

        <h1 className="font-serif text-2xl font-semibold uppercase tracking-[0.14em] text-blue-grey sm:text-3xl">
          Lista de Presentes
        </h1>

        <IconHeart className="h-3.5 w-3.5 text-terracotta" />

        <p className="max-w-[320px] font-sans text-sm leading-relaxed text-foreground/75">
          {giftListSubtitle}
        </p>
      </header>

      <div className="relative z-10 mt-8">
        <PixCard />
      </div>

      {presentes.length > 0 ? (
        <div className="relative z-10 mt-8 grid grid-cols-2 gap-4">
          {presentes.map((presente) => (
            <GiftCard key={presente.id} presente={presente} />
          ))}
        </div>
      ) : (
        <p className="relative z-10 mt-10 text-center font-sans text-sm text-foreground/70">
          Não foi possível carregar a lista agora. Tente novamente em instantes.
        </p>
      )}

      <footer className="relative z-10 mt-12 flex flex-col items-center gap-3 text-center">
        <p className="font-serif text-sm font-semibold uppercase tracking-[0.16em] text-blue-grey">
          Obrigado por fazer parte desse momento!
        </p>

        <IconHeart className="h-4 w-4 text-terracotta" />

        <Image
          src="/monograma.png"
          alt="Monograma Isabela & Bernardo"
          width={72}
          height={72}
          className="h-16 w-16 object-contain"
        />
      </footer>
    </main>
  );
}
