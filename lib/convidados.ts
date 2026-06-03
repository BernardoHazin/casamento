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

export type RsvpStatus = RsvpConfirmation | "pendente";

export function getRsvpStatus(confirmed: string): RsvpStatus {
  if (confirmed === "sim" || confirmed === "nao") {
    return confirmed;
  }

  return "pendente";
}

export type RsvpSummary = {
  total: number;
  confirmed: number;
  declined: number;
  pending: number;
  withCompanion: number;
};

export function summarizeRsvp(guests: Convidado[]): RsvpSummary {
  return guests.reduce<RsvpSummary>(
    (summary, guest) => {
      const status = getRsvpStatus(guest.confirmed);

      return {
        total: summary.total + 1,
        confirmed: summary.confirmed + (status === "sim" ? 1 : 0),
        declined: summary.declined + (status === "nao" ? 1 : 0),
        pending: summary.pending + (status === "pendente" ? 1 : 0),
        withCompanion:
          summary.withCompanion +
          (status === "sim" && guest.hasCompanion && guest.companion?.trim()
            ? 1
            : 0),
      };
    },
    {
      total: 0,
      confirmed: 0,
      declined: 0,
      pending: 0,
      withCompanion: 0,
    },
  );
}

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
