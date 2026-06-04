"use client";

import { useCallback, useMemo } from "react";
import { PixBR } from "pixbrasil";
import { toast } from "react-toastify";
import { pix as pixConfig } from "@/site.config";

interface UsePixProps {
  amount?: number;
}

const usePix = ({ amount }: UsePixProps = {}) => {
  const pix = useMemo(() => {
    return PixBR({
      key: pixConfig.key,
      name: pixConfig.merchantName,
      city: pixConfig.merchantCity,
      message: pixConfig.message,
      amount,
    });
  }, [amount]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(pix);
      toast.success("QR Code copiado para área de transferência");
    } catch {
      toast.error("Não foi possível copiar. Tente novamente.");
    }
  }, [pix]);

  return { pix, copy };
};

export { usePix };
