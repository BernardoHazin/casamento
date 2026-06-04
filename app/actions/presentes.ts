"use server";

import { revalidatePath } from "next/cache";
import {
  PRESENTE_TOTAL_QUOTES,
  updatePresente,
  type PresenteInput,
} from "@/lib/presentes";
import { isFirebaseClientConfigured } from "@/lib/firebase/client";

export type PresenteUpdateState =
  | { ok: true; message: string }
  | { ok: false; message: string }
  | null;

function normalizeIcon(icon: string): string {
  return icon.trim().replace(/\.png$/i, "").replace(/[^a-zA-Z0-9-_]/g, "");
}

function parsePresenteInput(formData: FormData): PresenteInput | { error: string } {
  const name = formData.get("name")?.toString().trim() ?? "";
  const priceRaw = formData.get("price")?.toString().trim() ?? "";
  const quotesRaw = formData.get("quotes")?.toString().trim() ?? "";
  const icon = normalizeIcon(formData.get("icon")?.toString() ?? "");

  if (!name) {
    return { error: "Informe o nome do presente." };
  }

  if (name.length > 200) {
    return { error: "O nome deve ter no máximo 200 caracteres." };
  }

  const price = Number(priceRaw.replace(",", "."));
  if (!Number.isFinite(price) || price < 0) {
    return { error: "Informe um valor válido." };
  }

  const quotes = Number.parseInt(quotesRaw, 10);
  if (
    !Number.isInteger(quotes) ||
    quotes < 0 ||
    quotes > PRESENTE_TOTAL_QUOTES
  ) {
    return {
      error: `As cotas devem ser um número entre 0 e ${PRESENTE_TOTAL_QUOTES}.`,
    };
  }

  if (!icon) {
    return { error: "Informe o ícone (nome do arquivo sem .png)." };
  }

  return { name, price, quotes, icon };
}

export async function submitPresenteUpdate(
  _prevState: PresenteUpdateState,
  formData: FormData,
): Promise<PresenteUpdateState> {
  const id = formData.get("id")?.toString().trim();

  if (!id) {
    return { ok: false, message: "Presente inválido." };
  }

  const parsed = parsePresenteInput(formData);

  if ("error" in parsed) {
    return { ok: false, message: parsed.error };
  }

  if (!isFirebaseClientConfigured()) {
    console.info("[Presente update]", { id, ...parsed });

    return {
      ok: true,
      message: "Alterações registradas (modo local, sem Firebase).",
    };
  }

  try {
    await updatePresente(id, parsed);
    revalidatePath("/lista-de-presentes");
    revalidatePath("/presentes");
  } catch (error) {
    console.error("[Presente update] Firestore update failed", error);

    return {
      ok: false,
      message:
        "Não foi possível salvar agora. Tente novamente em instantes.",
    };
  }

  return { ok: true, message: "Presente atualizado." };
}
