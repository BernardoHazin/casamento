import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PresenteEditForm } from "@/app/components/wedding/gifts/presente-edit-form";
import { IconGift, IconHeart } from "@/app/components/wedding/icons";
import { getPresentes } from "@/lib/presentes";
import { isFirebaseClientConfigured } from "@/lib/firebase/client";

export const metadata: Metadata = {
  title: "Editar presentes — Isabela & Bernardo",
  description: "Painel para editar os itens da lista de presentes.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

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

export default async function PresentesAdminPage() {
  const presentes = isFirebaseClientConfigured() ? await getPresentes() : [];

  return (
    <main className="relative mx-auto flex min-h-full w-full max-w-[720px] flex-col bg-cream px-5 pb-16 pt-6 sm:px-8">
      <Link
        href="/lista-de-presentes"
        className="inline-flex items-center gap-1 self-start font-sans text-xs font-medium uppercase tracking-[0.12em] text-blue-grey/80 transition hover:text-blue-grey"
      >
        <ChevronLeft className="h-4 w-4" />
        Lista de presentes
      </Link>

      <header className="mt-8 flex flex-col items-center gap-3 text-center">
        <IconGift className="h-9 w-9 text-blue-grey" />

        <h1 className="font-serif text-2xl font-semibold uppercase tracking-[0.14em] text-blue-grey sm:text-3xl">
          Editar presentes
        </h1>

        <IconHeart className="h-3.5 w-3.5 text-terracotta" />

        <p className="max-w-[420px] font-sans text-sm leading-relaxed text-foreground/75">
          Atualize nome, valor, cotas disponíveis e ícone de cada item. As
          alterações aparecem na lista pública após salvar.
        </p>
      </header>

      {presentes.length > 0 ? (
        <div className="mt-8 space-y-6">
          {presentes.map((presente) => (
            <PresenteEditForm key={presente.id} presente={presente} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center font-sans text-sm text-foreground/70">
          Não foi possível carregar os presentes agora.
        </p>
      )}

      <footer className="mt-12 flex justify-center">
        <Image
          src="/monograma.png"
          alt="Monograma Isabela & Bernardo"
          width={56}
          height={56}
          className="h-14 w-14 object-contain opacity-80"
        />
      </footer>
    </main>
  );
}
