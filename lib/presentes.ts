import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import {
  getFirestoreDb,
  isFirebaseClientConfigured,
} from "@/lib/firebase/client";

export const PRESENTE_TOTAL_QUOTES = 5;

export const PRESENTE_ICON_OPTIONS = [
  "airplane",
  "bill",
  "bride-credit-card",
  "coffee",
  "couch",
  "gift",
  "gift-2",
  "money",
  "party-hard",
  "pets",
  "pig",
  "pizza",
  "spa",
  "tv",
  "vip",
  "wine-toast",
] as const;

export type PresenteIcon = (typeof PRESENTE_ICON_OPTIONS)[number];

export type Presente = {
  id: string;
  name: string;
  price: number;
  quotes: number;
  icon: string;
};

export type PresenteInput = {
  name: string;
  price: number;
  quotes: number;
  icon: string;
};

function mapPresenteDoc(presenteDoc: {
  id: string;
  data: () => Record<string, unknown>;
}): Presente {
  const data = presenteDoc.data();

  return {
    id: presenteDoc.id,
    name: String(data.name ?? ""),
    price: Number(data.price ?? 0),
    quotes: Number(data.quotes ?? 0),
    icon: String(data.icon ?? "gift"),
  };
}

export function formatPresentePrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export async function getPresentes(): Promise<Presente[]> {
  if (!isFirebaseClientConfigured()) {
    return [];
  }

  const snapshot = await getDocs(collection(getFirestoreDb(), "presentes"));

  return snapshot.docs
    .map(mapPresenteDoc)
    .filter((presente) => presente.name.length > 0)
    .sort((a, b) => a.price - b.price);
}

export async function updatePresente(
  id: string,
  input: PresenteInput,
): Promise<void> {
  await updateDoc(doc(getFirestoreDb(), "presentes", id), {
    name: input.name,
    price: input.price,
    quotes: input.quotes,
    icon: input.icon,
  });
}
