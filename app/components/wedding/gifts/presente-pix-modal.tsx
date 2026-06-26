"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@base-ui/react/button";
import { PixQrCode } from "@/app/components/wedding/gifts/pix-qr-code";
import { formatPresentePrice, type Presente } from "@/lib/presentes";
import { usePix } from "@/hooks/use-pix";
import { pix } from "@/site.config";

type PresentePixModalProps = {
  presente: Presente;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PresentePixModal({
  presente,
  open,
  onOpenChange,
}: PresentePixModalProps) {
  const { copy } = usePix({ amount: presente.price });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/30 transition-opacity duration-300 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
        <Dialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <Dialog.Popup className="flex w-[min(100vw-2.5rem,22rem)] origin-center flex-col items-center gap-4 rounded-2xl border border-wedding-slate/20 bg-white p-5 shadow-lg transition-[transform,opacity] duration-300 ease-out data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none">
            <Dialog.Title className="text-center font-serif text-lg leading-snug text-blue-grey">
              {presente.name}
            </Dialog.Title>

            <p className="font-sans text-lg font-medium text-blue-grey">
              {formatPresentePrice(presente.price)}
            </p>

            {open ? (
              <PixQrCode amount={presente.price} size={192} />
            ) : (
              <div
                aria-hidden
                className="h-48 w-48 shrink-0 rounded-lg border border-wedding-slate/15 bg-cream/50"
              />
            )}

            <p className="text-center font-sans text-sm leading-relaxed text-blue-grey">
              {pix.instructions}
            </p>

            <Button
              type="button"
              onClick={() => void copy()}
              className="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-xl bg-blue-grey font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white outline-none transition hover:brightness-105 focus-visible:ring-2 focus-visible:ring-blue-grey/40 focus-visible:ring-offset-2"
            >
              Copiar código PIX
            </Button>

            <Dialog.Close className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-blue-grey outline-none transition hover:text-blue-grey focus-visible:ring-2 focus-visible:ring-blue-grey/30">
              Fechar
            </Dialog.Close>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
