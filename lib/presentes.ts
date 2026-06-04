import { collection, getDocs } from "firebase/firestore";
import {
  getFirestoreDb,
  isFirebaseClientConfigured,
} from "@/lib/firebase/client";

export const PRESENTE_TOTAL_QUOTES = 5;

export type Presente = {
  id: string;
  name: string;
  price: number;
  quotes: number;
  icon: string;
};

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
    .map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        name: String(data.name ?? ""),
        price: Number(data.price ?? 0),
        quotes: Number(data.quotes ?? 0),
        icon: String(data.icon ?? "gift"),
      };
    })
    .filter((presente) => presente.name.length > 0)
    .sort((a, b) => a.price - b.price);
}
