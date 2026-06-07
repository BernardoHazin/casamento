import Image from "next/image";

export function TimelineSection() {
  return (
    <section className="relative bg-linear-to-b from-cream via-white to-lavender-mist px-6 pt-16 pb-32 flex flex-col items-center gap-4">
      <Image src="/heart.png" alt="Heart" width={20} height={20} />

      <h2 className="font-cormorant-sc text-xl font-semibold tracking-[0.12em] text-wedding-slate">
        Cronograma
      </h2>

      <p className="text-upper w-full font-serif text-2xl mt-4 leading-[1.20] text-terracotta text-center">
        Nossa programação
        <span className="block font-script text-6xl font-normal leading-none">
          do grande dia
        </span>
      </p>

      <p className="text-center font-serif text-md leading-[1.20] text-wedding-slate mt-4 mb-4">
        Preparamos cada momento com muito carinho para <br /> vivermos juntos um
        dia inesquecível!
      </p>

      <Image
        src="/timeline.png"
        alt="Timeline"
        width={1000}
        height={1000}
        className="w-full h-auto"
      />

      <Image
        src="/image.png"
        alt="Timeline Footer"
        width={409}
        height={409}
        className="absolute -bottom-24 right-0"
      />
    </section>
  );
}
