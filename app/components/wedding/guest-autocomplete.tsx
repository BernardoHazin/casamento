"use client";

import { useMemo, useState } from "react";
import type { Convidado } from "@/lib/convidados";

type GuestAutocompleteProps = {
  guests: Convidado[];
  onGuestChange?: (guest: Convidado | null) => void;
};

function normalizeForSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

export function GuestAutocomplete({
  guests,
  onGuestChange,
}: GuestAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [open, setOpen] = useState(false);

  const filteredGuests = useMemo(() => {
    const normalizedQuery = normalizeForSearch(query.trim());

    if (!normalizedQuery) {
      return guests;
    }

    return guests.filter((guest) =>
      normalizeForSearch(guest.id).includes(normalizedQuery),
    );
  }, [guests, query]);

  function handleSelect(guest: Convidado) {
    setSelectedId(guest.id);
    setQuery(guest.id);
    setOpen(false);
    onGuestChange?.(guest);
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setSelectedId("");
    setOpen(true);
    onGuestChange?.(null);
  }

  return (
    <div className="relative flex flex-col gap-2">
      <label
        htmlFor="guest-search"
        className="font-sans text-sm font-medium text-blue-grey"
      >
        Nome e sobrenome
      </label>

      <input type="hidden" name="name" value={selectedId} required />

      <input
        id="guest-search"
        type="search"
        autoComplete="off"
        enterKeyHint="search"
        value={query}
        placeholder="Busque seu nome na lista"
        onChange={(event) => handleQueryChange(event.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 150);
        }}
        className="min-h-12 w-full rounded-xl border border-wedding-slate/25 bg-cream/40 px-4 font-sans text-base text-foreground outline-none transition placeholder:text-foreground/35 focus:border-wedding-slate/50 focus:ring-2 focus:ring-wedding-slate/20"
      />

      {open && filteredGuests.length > 0 ? (
        <ul
          role="listbox"
          aria-label="Convidados"
          className="absolute top-full z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-wedding-slate/15 bg-white py-1 shadow-lg"
        >
          {filteredGuests.map((guest) => (
            <li
              key={guest.id}
              role="option"
              aria-selected={selectedId === guest.id}
            >
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(guest)}
                className="flex w-full flex-col gap-0.5 px-4 py-3 text-left font-sans text-sm text-foreground outline-none transition hover:bg-cream/80 focus-visible:bg-cream/80"
              >
                <span>{guest.id}</span>
                {guest.hasCompanion ? (
                  <span className="text-xs text-foreground/55">
                    {guest.companion
                      ? `Acompanhante: ${guest.companion}`
                      : "Convite com acompanhante"}
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {open && query.trim() && filteredGuests.length === 0 ? (
        <p className="absolute top-full z-50 mt-2 w-full rounded-xl border border-wedding-slate/15 bg-white px-4 py-3 font-sans text-sm text-foreground/60 shadow-lg">
          Nenhum convidado encontrado.
        </p>
      ) : null}
    </div>
  );
}
