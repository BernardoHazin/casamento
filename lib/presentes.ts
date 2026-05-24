import { collection, getDocs } from "firebase/firestore";
import {
  getFirestoreDb,
  isFirebaseClientConfigured,
} from "@/lib/firebase/client";

export type Presente = {
  id: string;
  name: string;
  price: number;
  quotes: number;
};

type IconRule = {
  test: RegExp;
  src: string;
};

const iconRules: IconRule[] = [
  { test: /pizza|comida|culinária|cozinha/i, src: "/pizza.png" },
  { test: /café|manhã/i, src: "/coffee.png" },
  { test: /vinho|brinde|drink/i, src: "/wine-toast.png" },
  { test: /viagem|lua de mel|passe/i, src: "/airplane.png" },
  { test: /spa|relax|salão|beleza|capilar/i, src: "/spa.png" },
  { test: /pet|Flor|Chiara|pat|bich|ração|petiscos/i, src: "/pets.png" },
  { test: /sofá|lar|cobertor|noivo|noiva/i, src: "/couch.png" },
  { test: /tv|streaming/i, src: "/tv.png" },
  { test: /festa|bar|loco|música|vip/i, src: "/party-hard.png" },
  { test: /boleto|cartão|casamento|fundo|dinheiro|presente|convidado|aposentadoria/i, src: "/money.png" },
];

const categoryRules: IconRule[] = [
  { test: /pet|Flor|Chiara|pat|bich|ração|petiscos/i, src: "PETS" },
  { test: /viagem|lua de mel|passe/i, src: "VIAGEM" },
  { test: /pizza|comida|culinária|cozinha|café/i, src: "COZINHA" },
  { test: /spa|relax|salão|beleza/i, src: "BEM-ESTAR" },
  { test: /festa|bar|loco|streaming|vip/i, src: "LAZER" },
  { test: /jantar|pizza/i, src: "JANTAR" },
];

export function getPresenteIcon(name: string): string {
  return iconRules.find((rule) => rule.test.test(name))?.src ?? "/gift.png";
}

export function getPresenteCategory(name: string): string {
  return categoryRules.find((rule) => rule.test.test(name))?.src ?? "CASAL";
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
    .map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        name: String(data.name ?? ""),
        price: Number(data.price ?? 0),
        quotes: Number(data.quotes ?? 0),
      };
    })
    .filter((presente) => presente.name.length > 0)
    .sort((a, b) => a.price - b.price);
}
