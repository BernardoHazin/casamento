import Image from "next/image";
import { dressCode } from "@/site.config";
import { IconBowTie } from "./icons";

export function DressCodeSection() {
  return (
    <section className="bg-white px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-[600px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <IconBowTie className="h-10 w-10 text-terracotta" />
          <h2 className="font-serif text-3xl font-semibold tracking-[0.12em] text-wedding-slate sm:text-4xl">
            DRESS CODE
          </h2>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-cream/50 ring-1 ring-wedding-slate/10">
              <Image
                src="/dresscode-1.png"
                alt="Inspiração de vestido para convidadas"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <h3 className="mt-6 font-serif text-xl font-semibold tracking-wide text-wedding-slate">
              PARA ELAS
            </h3>
            <ul className="mt-4 space-y-2 text-left font-sans text-foreground/85">
              {dressCode.forHer.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-cream/50 ring-1 ring-wedding-slate/10">
              <Image
                src="/dresscode-2.png"
                alt="Inspiração de traje para convidados"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <h3 className="mt-6 font-serif text-xl font-semibold tracking-wide text-wedding-slate">
              PARA ELES
            </h3>
            <ul className="mt-4 space-y-2 text-left font-sans text-foreground/85">
              {dressCode.forHim.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
