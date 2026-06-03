"use client";

import { useActionState, useState } from "react";
import { Select } from "@base-ui/react/select";
import { Button } from "@base-ui/react/button";
import { submitRsvp, type RsvpState } from "@/app/actions/rsvp";
import type { Convidado, RsvpConfirmation } from "@/lib/convidados";
import { GuestAutocomplete } from "./guest-autocomplete";
import { ChevronDown } from "./icons";
import Image from "next/image";

const initialState: RsvpState = null;

function getStoredAttendance(confirmed: string): RsvpConfirmation | "" {
  return confirmed === "sim" || confirmed === "nao" ? confirmed : "";
}

type RsvpSectionProps = {
  guests: Convidado[];
};

export function RsvpSection({ guests }: RsvpSectionProps) {
  const [state, formAction, pending] = useActionState(submitRsvp, initialState);
  const [selectedGuest, setSelectedGuest] = useState<Convidado | null>(null);
  const [attendance, setAttendance] = useState<RsvpConfirmation | "">("");
  const [companionName, setCompanionName] = useState("");

  function handleGuestChange(guest: Convidado | null) {
    setSelectedGuest(guest);
    setAttendance(guest ? getStoredAttendance(guest.confirmed) : "");
    setCompanionName(guest?.hasCompanion ? (guest.companion ?? "") : "");
  }

  return (
    <section className="relative px-6 py-6">
      <div className="pointer-events-none absolute left-0 top-0 z-0 w-[280px]">
        <Image
          src="/flower-3.png"
          alt=""
          width={140}
          height={240}
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="mx-auto flex max-w-[600px] flex-col items-center gap-8 text-center">
        <Image src="/email.png" alt="Email" width={42} height={42} />

        <h2 className="font-serif text-xl font-semibold tracking-[0.12em] text-wedding-slate">
          RSVP
        </h2>

        <form action={formAction} className="w-full space-y-6 text-left">
          <GuestAutocomplete
            guests={guests}
            onGuestChange={handleGuestChange}
          />

          {selectedGuest?.hasCompanion ? (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="companion-name"
                className="font-sans text-sm font-medium text-foreground/80"
              >
                Nome do acompanhante
              </label>
              <input
                id="companion-name"
                name="companion"
                type="text"
                required
                value={companionName}
                onChange={(event) => setCompanionName(event.target.value)}
                placeholder="Como no convite"
                className="min-h-12 w-full rounded-xl border border-wedding-slate/25 bg-cream/40 px-4 font-sans text-base text-foreground outline-none transition placeholder:text-foreground/35 focus:border-wedding-slate/50 focus:ring-2 focus:ring-wedding-slate/20"
              />
            </div>
          ) : null}

          <div className="flex flex-col gap-2">
            <span
              id="rsvp-attendance-label"
              className="font-sans text-sm font-medium text-foreground/80"
            >
              Confirme ou decline o convite
            </span>

            <Select.Root
              name="attendance"
              required
              value={attendance || null}
              onValueChange={(value) =>
                setAttendance((value as RsvpConfirmation | null) ?? "")
              }
              aria-labelledby="rsvp-attendance-label"
            >
              <Select.Trigger className="flex min-h-12 w-full items-center justify-between gap-2 rounded-xl border border-wedding-slate/25 bg-cream/40 px-4 font-sans text-base text-foreground outline-none transition hover:border-wedding-slate/35 data-placeholder:text-foreground/40 focus-visible:ring-2 focus-visible:ring-wedding-slate/25">
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
                    </Select.List>
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </div>

          <Button
            type="submit"
            disabled={pending || guests.length === 0}
            className="w-full min-h-12 rounded-full bg-wedding-slate font-sans text-sm font-semibold uppercase tracking-wide text-white shadow-sm outline-none transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-wedding-slate/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:pointer-events-none disabled:opacity-60"
          >
            {pending ? "Enviando…" : "Confirmar"}
          </Button>

          {guests.length === 0 ? (
            <p className="text-center font-sans text-sm text-terracotta">
              Não foi possível carregar a lista de convidados agora.
            </p>
          ) : null}

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
