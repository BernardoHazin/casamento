import Image from "next/image";
import { dressCode } from "@/site.config";

type DressCodeCardProps = {
  title: string;
  items: readonly string[];
  imageSrc: string;
  imageAlt: string;
  imageFirst: boolean;
};

function DressCodeCard({
  title,
  items,
  imageSrc,
  imageAlt,
  imageFirst,
}: DressCodeCardProps) {
  const illustration = (
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={120}
      height={249}
      className={`absolute -top-4 ${imageFirst ? "-left-15" : "-right-15"}`}
    />
  );

  const content = (
    <div
      className={`min-w-0 flex-1 ${imageFirst ? "text-right pl-10" : "text-left pr-10"}`}
    >
      <h3 className="font-serif text-sm font-semibold text-blue-grey">
        {title}
      </h3>
      <ul className="mt-2 space-y-1 font-serif text-[0.7rem] leading-snug text-blue-grey">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="relative w-[310px] h-[180px] flex items-center gap-2 rounded-[1.75rem] bg-white/55 px-3 py-4">
      {illustration}
      {content}
    </div>
  );
}

export function DressCodeSection() {
  return (
    <section className="relative flex flex-col items-center gap-4 bg-lavender-mist px-4 pt-10 pb-80">
      <Image
        src="/dresscode-bow-tie.png"
        alt=""
        width={48}
        height={48}
        className=""
      />

      <div className="text-center">
        <h2 className="font-cormorant-sc text-xl font-semibold text-blue-grey">
          Dresscode
        </h2>
        <p className="mt-1 font-serif text-sm font-medium text-terracotta">
          ESPORTE FINO
        </p>
      </div>

      <div className="flex w-full flex-col gap-8 items-center">
        <DressCodeCard
          title="PARA ELAS:"
          items={dressCode.forHer}
          imageSrc="/dresscode-couple-her.png"
          imageAlt="Inspiração de vestido para convidadas"
          imageFirst
        />

        <DressCodeCard
          title="PARA ELES:"
          items={dressCode.forHim}
          imageSrc="/dresscode-couple-him.png"
          imageAlt="Inspiração de traje para convidados"
          imageFirst={false}
        />
      </div>

      <div className="absolute left-0 bottom-0">
        <Image src="/dresscode-footer.png" alt="" width={500} height={249} />
      </div>
    </section>
  );
}
