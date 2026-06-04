"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { Button } from "@base-ui/react/button";
import {
  submitPresenteUpdate,
  type PresenteUpdateState,
} from "@/app/actions/presentes";
import {
  formatPresentePrice,
  PRESENTE_ICON_OPTIONS,
  PRESENTE_TOTAL_QUOTES,
  type Presente,
} from "@/lib/presentes";

const initialState: PresenteUpdateState = null;

const fieldClassName =
  "min-h-11 w-full rounded-xl border border-wedding-slate/25 bg-cream/40 px-4 font-sans text-base text-foreground outline-none transition placeholder:text-foreground/35 focus:border-wedding-slate/50 focus:ring-2 focus:ring-wedding-slate/20";

const labelClassName =
  "font-sans text-sm font-medium text-foreground/80";

type PresenteEditFormProps = {
  presente: Presente;
};

export function PresenteEditForm({ presente }: PresenteEditFormProps) {
  const [state, formAction, pending] = useActionState(
    submitPresenteUpdate,
    initialState,
  );
  const [icon, setIcon] = useState(presente.icon);

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-wedding-slate/15 bg-white p-4 shadow-sm"
    >
      <input type="hidden" name="id" value={presente.id} />

      <div className="flex items-start justify-between gap-3 border-b border-wedding-slate/10 pb-3">
        <div className="min-w-0">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-grey/60">
            ID do documento
          </p>
          <p className="truncate font-mono text-xs text-foreground/70">
            {presente.id}
          </p>
        </div>

        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-wedding-slate/15 bg-cream/30">
          <Image
            src={`/${icon}.png`}
            alt=""
            fill
            className="object-contain p-1"
            sizes="56px"
          />
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor={`name-${presente.id}`} className={labelClassName}>
            Nome
          </label>
          <input
            id={`name-${presente.id}`}
            name="name"
            type="text"
            required
            defaultValue={presente.name}
            className={fieldClassName}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor={`price-${presente.id}`} className={labelClassName}>
              Valor (R$)
            </label>
            <input
              id={`price-${presente.id}`}
              name="price"
              type="number"
              min={0}
              step={0.01}
              required
              defaultValue={presente.price}
              className={fieldClassName}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor={`quotes-${presente.id}`} className={labelClassName}>
              Cotas ({PRESENTE_TOTAL_QUOTES} máx.)
            </label>
            <input
              id={`quotes-${presente.id}`}
              name="quotes"
              type="number"
              min={0}
              max={PRESENTE_TOTAL_QUOTES}
              step={1}
              required
              defaultValue={presente.quotes}
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={`icon-${presente.id}`} className={labelClassName}>
            Ícone
          </label>
          <input
            id={`icon-${presente.id}`}
            name="icon"
            type="text"
            required
            list={`icons-${presente.id}`}
            value={icon}
            onChange={(event) => setIcon(event.target.value)}
            className={fieldClassName}
          />
          <datalist id={`icons-${presente.id}`}>
            {PRESENTE_ICON_OPTIONS.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
          <p className="font-sans text-xs text-foreground/55">
            Arquivo em{" "}
            <span className="font-mono">public/{icon || "…"}.png</span>
          </p>
        </div>
      </div>

      <p className="mt-3 font-sans text-xs text-foreground/55">
        Exibição: {presente.quotes}/{PRESENTE_TOTAL_QUOTES} ·{" "}
        {formatPresentePrice(presente.price)}
      </p>

      {state ? (
        <p
          role="status"
          className={`mt-3 font-sans text-sm ${
            state.ok ? "text-sage" : "text-terracotta"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        className="mt-4 flex min-h-10 w-full items-center justify-center rounded-xl bg-blue-grey font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white outline-none transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-blue-grey/40 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Salvando…" : "Salvar"}
      </Button>
    </form>
  );
}
