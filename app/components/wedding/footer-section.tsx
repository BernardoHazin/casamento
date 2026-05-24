import Image from "next/image";
import { HERO_COASTAL_IMAGE } from "@/site.config";
import { IconHeart } from "./icons";

export function FooterSection() {
  return (
    <footer className="bg-cream pb-16 pt-10">
      <div className="relative mx-auto max-w-[600px] overflow-hidden px-4">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl ring-1 ring-wedding-slate/10">
          <Image
            src={HERO_COASTAL_IMAGE}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center gap-2">
        <IconHeart className="h-6 w-6 text-terracotta" aria-hidden />
        <p className="font-script text-2xl text-wedding-slate/80">
          Com amor
        </p>
      </div>
    </footer>
  );
}
