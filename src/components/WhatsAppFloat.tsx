"use client";

import { useWhatsApp } from "@/providers/WhatsAppProvider";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloat() {
  const { open, loading } = useWhatsApp();

  return (
    <button
      type="button"
      onClick={() => open("Olá, gostaria de verificar meus descontos!")}
      disabled={loading}
      className="whatsapp-float"
      aria-label="Fale conosco no WhatsApp"
    >
      <WhatsAppIcon />
      <span className="whatsapp-pulse" />
    </button>
  );
}