import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconEnvelope, IconHeart } from "@/app/components/wedding/icons";
import {
  getConvidados,
  getRsvpStatus,
  summarizeRsvp,
  type Convidado,
  type RsvpStatus,
} from "@/lib/convidados";
import { isFirebaseClientConfigured } from "@/lib/firebase/client";

export const metadata: Metadata = {
  title: "Respostas RSVP — Isabela & Bernardo",
  description: "Resumo das confirmações de presença dos convidados.",
  robots: {
    index: false,
    follow: false,
  },
};

export const revalidate = 60;

const statusLabels: Record<RsvpStatus, string> = {
  sim: "Confirmado",
  nao: "Declinado",
  pendente: "Pendente",
};

const statusStyles: Record<RsvpStatus, string> = {
  sim: "bg-sage/15 text-sage ring-sage/25",
  nao: "bg-terracotta/10 text-terracotta ring-terracotta/20",
  pendente: "bg-wedding-slate/10 text-wedding-slate ring-wedding-slate/20",
};

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

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-wedding-slate/15 bg-white px-4 py-3 text-center shadow-sm">
      <p className="font-serif text-2xl font-semibold">{value}</p>
      <p className="font-sans text-xs uppercase tracking-[0.12em] opacity-80">
        {label}
      </p>
    </div>
  );
}

function GuestRow({ guest }: { guest: Convidado }) {
  const status = getRsvpStatus(guest.confirmed);

  return (
    <li className="rounded-2xl border border-wedding-slate/15 bg-white px-4 py-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-serif text-base text-blue-grey">{guest.id}</p>
          {guest.hasCompanion ? (
            <p className="mt-1 font-sans text-sm text-foreground/65">
              Acompanhante:{" "}
              {guest.companion?.trim() ? guest.companion : "—"}
            </p>
          ) : null}
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] ring-1 ring-inset ${statusStyles[status]}`}
        >
          {statusLabels[status]}
        </span>
      </div>
    </li>
  );
}

export default async function RespostasPage() {
  const guests = isFirebaseClientConfigured() ? await getConvidados() : [];
  const summary = summarizeRsvp(guests);

  const groupedGuests: Record<RsvpStatus, Convidado[]> = {
    sim: [],
    nao: [],
    pendente: [],
  };

  for (const guest of guests) {
    groupedGuests[getRsvpStatus(guest.confirmed)].push(guest);
  }

  return (
    <main className="relative mx-auto flex min-h-full w-full max-w-[720px] flex-col bg-cream px-5 pb-16 pt-6 sm:px-8">
      <Link
        href="/"
        className="relative z-10 inline-flex items-center gap-1 self-start font-sans text-xs font-medium uppercase tracking-[0.12em] text-blue-grey/80 transition hover:text-blue-grey"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar
      </Link>

      <header className="relative z-10 mt-8 flex flex-col items-center gap-3 text-center">
        <IconEnvelope className="h-9 w-9 text-terracotta" />

        <h1 className="font-serif text-2xl font-semibold uppercase tracking-[0.14em] text-blue-grey sm:text-3xl">
          Respostas RSVP
        </h1>

        <IconHeart className="h-3.5 w-3.5 text-terracotta" />

        <p className="max-w-[420px] font-sans text-sm leading-relaxed text-foreground/75">
          Acompanhe as confirmações de presença dos convidados.
        </p>
      </header>

      {guests.length > 0 ? (
        <>
          <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SummaryCard label="Total" value={summary.total} />
            <SummaryCard label="Confirmados" value={summary.confirmed} />
            <SummaryCard label="Declinados" value={summary.declined} />
            <SummaryCard label="Pendentes" value={summary.pending} />
          </div>

          <p className="relative z-10 mt-6 text-center font-sans text-xs text-foreground/55">
            {summary.withCompanion} confirmados informaram acompanhante
          </p>

          <section className="relative z-10 mt-10 space-y-8">
            {(["sim", "nao", "pendente"] as const).map((status) =>
              groupedGuests[status].length > 0 ? (
                <div key={status} className="space-y-3">
                  <h2 className="font-serif text-lg font-semibold uppercase tracking-[0.12em] text-blue-grey">
                    {statusLabels[status]} ({groupedGuests[status].length})
                  </h2>

                  <ul className="space-y-3">
                    {groupedGuests[status].map((guest) => (
                      <GuestRow key={guest.id} guest={guest} />
                    ))}
                  </ul>
                </div>
              ) : null,
            )}
          </section>
        </>
      ) : (
        <p className="relative z-10 mt-10 text-center font-sans text-sm text-foreground/70">
          Não foi possível carregar as respostas agora.
        </p>
      )}

      <footer className="relative z-10 mt-12 flex justify-center">
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
