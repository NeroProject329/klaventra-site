import { getWhatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloat() {
  const whatsappLink = getWhatsappLink();

  return (
    <a href={whatsappLink} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Fale conosco no WhatsApp">
      <WhatsAppIcon />
      <span className="whatsapp-pulse" />
    </a>
  );
}
