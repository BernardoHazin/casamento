import Image from "next/image";
import { COUPLE_NAMES, INVITATION_PARAGRAPH } from "@/site.config";
import { WaveDivider } from "./wave-divider";

export function HeroSection() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 z-1">
        <Image
          src="/olinda.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      <div className="pointer-events-none absolute left-0 top-0 z-2 w-[280px]">
        <Image
          src="/flower-3.png"
          alt=""
          width={240}
          height={200}
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="pointer-events-none absolute right-3 top-3 z-10 w-18 sm:right-6 sm:top-6 sm:w-21">
        <Image
          src="/monograma.png"
          alt="Monograma IB"
          width={96}
          height={96}
          className=""
          priority
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(88vh,820px)] max-w-[600px] flex-col items-center px-6 pb-8 pt-44 text-center">
        <p className="text-balance font-serif text-xl font-medium leading-snug text-wedding-slate">
          O início do nosso{" "}
          <span className="block font-script text-6xl font-normal leading-none">
            para sempre
          </span>
        </p>

        <h1 className="mt-8 font-serif text-xl font-semibold uppercase leading-tight tracking-[0.22em] text-wedding-slate">
          {COUPLE_NAMES.toUpperCase()}
        </h1>

        <p className="mx-auto mt-8 pr-24 text-left max-w-full text-pretty font-sans text-md leading-[1.20] text-wedding-slate">
          {INVITATION_PARAGRAPH}
        </p>

        <p className="mt-2 pr-24 text-upper text-left w-full font-serif text-md leading-[1.20] text-terracotta">
          01 de Novembro de 2026 <br /> 16h00
        </p>
      </div>

      <div className="relative z-10">
        <WaveDivider />
      </div>
    </section>
  );
}
