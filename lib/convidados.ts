import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase/client";

export type Convidado = {
  id: string;
  confirmed: string;
  hasCompanion: boolean;
  companion?: string;
};

export type RsvpConfirmation = "sim" | "nao";

function normalizeName(name: string): string {
  return name.trim().replace(/\s+/g, " ");
}

function mapConvidadoDoc(guestDoc: {
  id: string;
  data: () => Record<string, unknown>;
}): Convidado {
  const data = guestDoc.data();
  const hasCompanion = "companion" in data;

  return {
    id: guestDoc.id,
    confirmed: String(data.confirmed ?? ""),
    hasCompanion,
    companion: hasCompanion ? String(data.companion ?? "") : undefined,
  };
}

export async function getConvidados(): Promise<Convidado[]> {
  const snapshot = await getDocs(collection(getFirestoreDb(), "convidados"));

  return snapshot.docs
    .map(mapConvidadoDoc)
    .sort((a, b) => a.id.localeCompare(b.id, "pt-BR"));
}

export async function findConvidadoByName(
  name: string,
): Promise<Convidado | null> {
  const normalized = normalizeName(name);
  const db = getFirestoreDb();

  const exactRef = doc(db, "convidados", normalized);
  const exactSnap = await getDoc(exactRef);

  if (exactSnap.exists()) {
    return mapConvidadoDoc(exactSnap);
  }

  const lower = normalized.toLowerCase();
  const snapshot = await getDocs(collection(db, "convidados"));

  for (const guestDoc of snapshot.docs) {
    if (guestDoc.id.toLowerCase() === lower) {
      return mapConvidadoDoc(guestDoc);
    }
  }

  return null;
}

export async function updateConvidadoConfirmation(
  guestId: string,
  confirmed: RsvpConfirmation,
  companion?: string,
): Promise<void> {
  const update: Record<string, string> = { confirmed };

  if (companion !== undefined) {
    update.companion = companion;
  }

  await updateDoc(doc(getFirestoreDb(), "convidados", guestId), update);
}
