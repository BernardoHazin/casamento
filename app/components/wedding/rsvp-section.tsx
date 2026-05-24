"use client";

import { useActionState } from "react";
import { Field } from "@base-ui/react/field";
import { Select } from "@base-ui/react/select";
import { Button } from "@base-ui/react/button";
import { submitRsvp, type RsvpState } from "@/app/actions/rsvp";
import { IconEnvelope, ChevronDown } from "./icons";

const initialState: RsvpState = null;

export function RsvpSection() {
  const [state, formAction, pending] = useActionState(submitRsvp, initialState);

  return (
    <section className="bg-white px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-8 text-center">
        <IconEnvelope className="h-10 w-10 text-terracotta" />

        <h2 className="font-serif text-3xl font-semibold tracking-[0.12em] text-wedding-slate sm:text-4xl">
          RSVP
        </h2>

        <form
          action={formAction}
          className="w-full space-y-6 text-left"
        >
          <Field.Root
            name="name"
            className="flex flex-col gap-2"
          >
            <Field.Label className="font-sans text-sm font-medium text-foreground/80">
              Nome e sobrenome
            </Field.Label>
            <Field.Control
              required
              placeholder="Como no convite"
              className="min-h-12 w-full rounded-xl border border-wedding-slate/25 bg-cream/40 px-4 font-sans text-base text-foreground outline-none transition placeholder:text-foreground/35 focus:border-wedding-slate/50 focus:ring-2 focus:ring-wedding-slate/20"
            />
            <Field.Error className="font-sans text-sm text-terracotta" />
          </Field.Root>

          <div className="flex flex-col gap-2">
            <span
              id="rsvp-attendance-label"
              className="font-sans text-sm font-medium text-foreground/80"
            >
              Confirme sua presença
            </span>

            <Select.Root
              name="attendance"
              required
              aria-labelledby="rsvp-attendance-label"
            >
              <Select.Trigger
                className="flex min-h-12 w-full items-center justify-between gap-2 rounded-xl border border-wedding-slate/25 bg-cream/40 px-4 font-sans text-base text-foreground outline-none transition hover:border-wedding-slate/35 data-placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-wedding-slate/25"
              >
                <Select.Value placeholder="Escolha uma opção" />
                <Select.Icon>
                  <ChevronDown className="h-5 w-5 text-wedding-slate/70" />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Positioner align="start" sideOffset={8}>
                  <Select.Popup className="z-50 min-w-(--anchor-width) rounded-xl border border-wedding-slate/15 bg-white py-1 shadow-lg outline-none">
                    <Select.List className="max-h-60 overflow-auto outline-none">
                      <Select.Item
                        value="sim"
                        className="cursor-pointer px-4 py-3 font-sans text-sm text-foreground outline-none data-highlighted:bg-cream/80"
                      >
                        <Select.ItemText>Sim, estarei presente</Select.ItemText>
                      </Select.Item>
                      <Select.Item
                        value="nao"
                        className="cursor-pointer px-4 py-3 font-sans text-sm text-foreground outline-none data-highlighted:bg-cream/80"
                      >
                        <Select.ItemText>Não poderei ir</Select.ItemText>
                      </Select.Item>
                      <Select.Item
                        value="talvez"
                        className="cursor-pointer px-4 py-3 font-sans text-sm text-foreground outline-none data-highlighted:bg-cream/80"
                      >
                        <Select.ItemText>Ainda não tenho certeza</Select.ItemText>
                      </Select.Item>
                    </Select.List>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="w-full min-h-12 rounded-full bg-wedding-slate font-sans text-sm font-semibold uppercase tracking-wide text-white shadow-sm outline-none transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-wedding-slate/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-60"
          >
            {pending ? "Enviando…" : "Confirmar"}
          </Button>

          {state ? (
            <p
              role="status"
              className={`text-center font-sans text-sm ${
                state.ok ? "text-sage" : "text-terracotta"
              }`}
            >
              {state.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
