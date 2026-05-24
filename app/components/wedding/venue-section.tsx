import Image from "next/image";
import { Button } from "@base-ui/react/button";
import { venue } from "@/site.config";
import { IconPin } from "./icons";

export function VenueSection() {
  return (
    <section className="bg-cream px-6 py-16">
      <div className="mx-auto flex flex-col items-center gap-10 text-center">
        <IconPin className="h-10 w-10 text-terracotta" aria-hidden />

        <div>
          <h2 className="font-serif text-3xl font-semibold tracking-[0.12em] text-wedding-slate">
            O LOCAL
          </h2>
        </div>

        <div className="w-full flex items-center justify-center">
          <Image
            src="/sobrado-mourisco.png"
            alt={`Ilustração do local — ${venue.name}`}
            width={218}
            height={180}
            className="h-[180px] w-[218px] object-cover"
          />
        </div>

        <div className="space-y-2 font-sans text-foreground/85">
          <p className="text-xl font-serif text-blue-grey">{venue.name}</p>

          {venue.lines.map((line) => (
            <p key={line} className="text-base font-serif text-blue-grey">
              {line}
            </p>
          ))}
        </div>

        <Button
          nativeButton={false}
          render={
            <a
              href={venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-blue-grey px-10 font-sans text-sm font-semibold uppercase tracking-wide text-white shadow-sm outline-none transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-blue-grey/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            />
          }
        >
          Como chegar
        </Button>
      </div>
    </section>
  );
}
