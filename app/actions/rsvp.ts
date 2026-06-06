"use server";

import {
  findConvidadoByName,
  updateConvidadoConfirmation,
  type RsvpConfirmation,
} from "@/lib/convidados";
import { isFirebaseClientConfigured } from "@/lib/firebase/client";

export type RsvpState =
  | { ok: true; message: string }
  | { ok: false; message: string }
  | null;

const attendanceValues = new Set<RsvpConfirmation>(["sim", "nao"]);

export async function submitRsvp(
  _prevState: RsvpState,
  formData: FormData,
): Promise<RsvpState> {
  const name = formData.get("name")?.toString().trim();
  const attendance = formData.get("attendance")?.toString();
  const companion = formData.get("companion")?.toString().trim();

  if (!name) {
    return {
      ok: false,
      message: "Selecione seu nome na lista de convidados.",
    };
  }

  if (name.length > 120) {
    return {
      ok: false,
      message: "Por favor, use um nome com no máximo 120 caracteres.",
    };
  }

  if (!attendance || !attendanceValues.has(attendance as RsvpConfirmation)) {
    return {
      ok: false,
      message: "Selecione se você confirmará ou declinará o convite.",
    };
  }

  const confirmed = attendance as RsvpConfirmation;

  if (!isFirebaseClientConfigured()) {
    console.info("[RSVP]", {
      name,
      confirmed,
      companion,
      receivedAt: new Date().toISOString(),
    });

    return {
      ok: true,
      message:
        confirmed === "sim"
          ? "Obrigado! Sua presença foi confirmada com carinho."
          : "Obrigado por nos avisar. Sentiremos sua falta!",
    };
  }

  try {
    const guest = await findConvidadoByName(name);

    if (!guest) {
      return {
        ok: false,
        message:
          "Não encontramos seu nome na lista de convidados. Verifique se está igual ao convite.",
      };
    }

    if (companion && companion.length > 120) {
      return {
        ok: false,
        message: "Use um nome de acompanhante com no máximo 120 caracteres.",
      };
    }

    await updateConvidadoConfirmation(
      guest.id,
      confirmed,
      guest.hasCompanion ? companion : undefined,
    );
  } catch (error) {
    console.error("[RSVP] Firestore update failed", error);

    return {
      ok: false,
      message:
        "Não conseguimos salvar sua resposta agora. Tente novamente em instantes.",
    };
  }

  return {
    ok: true,
    message:
      confirmed === "sim"
        ? "Obrigado! Sua presença foi confirmada com carinho."
        : "Obrigado por nos avisar. Sentiremos sua falta!",
  };
}
