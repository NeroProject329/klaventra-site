import {
  buildWhatsAppRedirectPath,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/whatsappRedirect";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppRedirectPath(DEFAULT_WHATSAPP_MESSAGE)}
      className="whatsapp-float"
      aria-label="Fale conosco no WhatsApp"
    >
      <WhatsAppIcon />
      <span className="whatsapp-pulse" />
    </a>
  );
}
