"use server";

import { FieldValue } from "firebase-admin/firestore";
import {
  getAdminFirestore,
  isFirebaseConfigured,
} from "@/lib/firebase/admin";

export type RsvpState =
  | { ok: true; message: string }
  | { ok: false; message: string }
  | null;

const attendanceValues = new Set(["sim", "nao", "talvez"]);

export async function submitRsvp(
  _prevState: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const name = formData.get("name")?.toString().trim();
  const attendance = formData.get("attendance")?.toString();

  if (!name) {
    return { ok: false, message: "Por favor, informe seu nome e sobrenome." };
  }

  if (name.length > 120) {
    return {
      ok: false,
      message: "Por favor, use um nome com no máximo 120 caracteres.",
    };
  }

  if (!attendance || !attendanceValues.has(attendance)) {
    return {
      ok: false,
      message: "Selecione se você confirmará presença.",
    };
  }

  if (!isFirebaseConfigured()) {
    console.info("[RSVP]", {
      name,
      attendance,
      receivedAt: new Date().toISOString(),
    });

    return {
      ok: true,
      message: "Obrigado! Sua resposta foi recebida com carinho.",
    };
  }

  try {
    await getAdminFirestore().collection("rsvps").add({
      name,
      attendance,
      receivedAt: FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error("[RSVP] Firestore write failed", error);

    return {
      ok: false,
      message:
        "Não conseguimos salvar sua resposta agora. Tente novamente em instantes.",
    };
  }

  return {
    ok: true,
    message: "Obrigado! Sua resposta foi recebida com carinho.",
  };
}
