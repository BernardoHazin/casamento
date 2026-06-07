/**
 * Wedding moment in America/Sao_Paulo (UTC−03:00 year-round).
 * Adjust `WEDDING_LOCAL_TIME` when the official start time is confirmed.
 */
export const WEDDING_LOCAL_TIME = "16:00";
export const WEDDING_TARGET_ISO = `2026-11-01T${WEDDING_LOCAL_TIME}:00-03:00`;

export const COUPLE_NAMES = "Isabela & Bernardo";

/**
 * Optional full-bleed hero photo (not used when the hero is solid cream to match the invitation layout).
 */
export const HERO_SECTION_BACKGROUND_IMAGE = "/olinda.png";

/** Footer strip / optional reuse elsewhere. */
export const HERO_COASTAL_IMAGE = "/marriage.png";

export const INVITATION_PARAGRAPH =
  "Convidam para o seu casamento! Junte-se a nós para celebrar o amor com um jantar especial, música e uma noite cheia de alegria.";

export const venue = {
  name: "Sobrado Mourisco",
  lines: ["Rua 27 de Janeiro, n° 25, Carmo, Olinda - PE."],
  mapsUrl: "https://maps.app.goo.gl/F6E3vyWwDzGLcPQu7",
} as const;

export const giftListUrl = "/lista-de-presentes";

export const giftListSubtitle =
  "Escolha um valor e faça parte desse novo capítulo com a gente!";

export const pix = {
  key: "isabelatelesf@gmail.com",
  /** Shown on the PIX QR (max 25 characters; accents are normalized by pixbrasil). */
  merchantName: "Isabela Teles",
  merchantCity: "Recife",
  message: "Presente para Isabela e Bernardo",
  /** Optional static image; when empty, a QR is generated from the PIX key. */
  qrCodeImage: "" as string,
  instructions:
    "Para presentear os noivos agora mesmo, é só abrir o aplicativo do seu banco e apontar a câmera para o QR Code ao lado.",
} as const;

export const giftGridImages = [
  { src: "/coffee.png", alt: "Café" },
  { src: "/wine-toast.png", alt: "Brinde" },
  { src: "/airplane.png", alt: "Viagem" },
  { src: "/spa.png", alt: "Spa" },
  { src: "/money.png", alt: "Contribuição" },
  { src: "/pizza.png", alt: "Experiências" },
  { src: "/couch.png", alt: "Lar" },
  { src: "/gift.png", alt: "Presente" },
] as const;

export type TimelineSide = "left" | "right";

export const timeline = [
  {
    time: "16h",
    title: "Boas-vindas",
    description: "Drinks e encontro dos convidados.",
    side: "left" as TimelineSide,
  },
  {
    time: "17h",
    title: "Cerimônia",
    description: "A troca de alianças e nossos votos.",
    side: "right" as TimelineSide,
  },
  {
    time: "18h30",
    title: "Festa",
    description: "Comemoração ao ar livre com música e alegria.",
    side: "left" as TimelineSide,
  },
  {
    time: "20h",
    title: "Jantar",
    description: "Um jantar especial para brindar o amor.",
    side: "right" as TimelineSide,
  },
  {
    time: "22h",
    title: "Música ao vivo",
    description: "Banda e muita animação na pista.",
    side: "left" as TimelineSide,
  },
  {
    time: "23h30",
    title: "Atração surpresa",
    description: "Um momento que guardamos com carinho.",
    side: "right" as TimelineSide,
  },
  {
    time: "00h30",
    title: "DJ",
    description: "Continue a noite dançando conosco.",
    side: "left" as TimelineSide,
  },
  {
    time: "03h",
    title: "Encerramento",
    description: "Gratidão por dividir este dia conosco.",
    side: "right" as TimelineSide,
  },
] as const;

export const dressCode = {
  forHer: [
    "Vestido longo ou midi, de modelagem fluida;",
    "Tecidos leves e elegantes;",
    "Cores suaves ou sofisticadas (como azul, verde, rosé, tons terrosos);",
    "Evitar branco, off-white e tons muito claros;",
    "Sandálias ou sapatos elegantes e confortáveis.",
  ],
  forHim: [
    "Camisa social ou camisa de tecido leve;",
    "Calça de alfaiataria ou chino;",
    "Blazer opcional;",
    "Gravata opcional;",
    "Evitar cores muito escuras, como preto total.",
  ],
} as const;

export const GIFT_SECTION_MESSAGE =
  "Sua presença já é o maior presente. Se desejar nos presentear, preparamos uma lista com carinho — sinta-se à vontade.";
