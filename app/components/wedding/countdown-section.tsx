"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { WEDDING_TARGET_ISO } from "@/site.config";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function CountdownSection() {
  const targetMs = useMemo(() => new Date(WEDDING_TARGET_ISO).getTime(), []);

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = Math.max(0, targetMs - now);
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);

  const segments = [
    { label: "DIAS", value: pad(days) },
    { label: "HORAS", value: pad(hours) },
    { label: "MINUTOS", value: pad(minutes) },
  ] as const;

  return (
    <section className="relative pt-6">
      <div className="px-6 text-center flex flex-col items-center gap-2.5">
        <p className="font-serif text-sm font-medium leading-snug text-wedding-slate">
          De todos os destinos, escolhemos um ao outro.
        </p>

        <svg
          width="150"
          height="10"
          viewBox="0 0 150 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_0_1)">
            <path
              d="M71.9482 0.625C73.1676 0.625 74.1552 1.72188 74.1552 3.075C74.1552 1.72188 75.1428 0.625 76.3622 0.625C77.5815 0.625 78.5691 1.72188 78.5691 3.075C78.5691 5.11438 76.7848 5.83375 74.3715 9.08C74.3449 9.11565 74.3118 9.14431 74.2744 9.16396C74.2371 9.18362 74.1964 9.1938 74.1552 9.1938C74.114 9.1938 74.0733 9.18362 74.0359 9.16396C73.9986 9.14431 73.9655 9.11565 73.9389 9.08C71.5256 5.83375 69.7412 5.11438 69.7412 3.075C69.7412 1.72188 70.7288 0.625 71.9482 0.625Z"
              fill="#E8753D"
            />
          </g>
          <line
            x1="89.1621"
            y1="3.7"
            x2="149.192"
            y2="3.7"
            stroke="#E8753D"
            strokeOpacity="0.7"
            strokeWidth="0.6"
          />
          <line
            x1="2.31529e-08"
            y1="3.7"
            x2="59.1471"
            y2="3.70001"
            stroke="#E8753D"
            strokeOpacity="0.7"
            strokeWidth="0.6"
          />
          <defs>
            <clipPath id="clip0_0_1">
              <rect
                width="8.82793"
                height="10"
                fill="white"
                transform="translate(69.7412)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="relative z-10 mx-auto mt-16 max-w-[600px] px-6 text-center">
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
          <Image
            src="/flower-4.png"
            alt=""
            width={150}
            height={300}
            className="object-cover object-center"
          />
        </div>

        <h2 className="font-great-vibes text-4xl text-wedding-slate">Faltam</h2>

        <div className="mt-10 flex flex-wrap items-start justify-center gap-6">
          {segments.map((s) => (
            <div
              key={s.label}
              className="flex min-w-18 flex-col items-center gap-2"
            >
              <span className="font-sans text-3xl font-semibold tabular-nums tracking-widest text-wedding-slate sm:text-4xl">
                {s.value}
              </span>
              <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-foreground/55 sm:text-xs">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
