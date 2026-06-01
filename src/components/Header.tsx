import Link from "next/link";
import { getWhatsappLink } from "@/lib/whatsapp";

export function Header() {
  const whatsappLink = getWhatsappLink();

  return (
    <header className="header">
      <div className="container">
        <Link href="/" className="logo" aria-label="Página inicial da Consultoria Azul">
         Braganholo e Ventura <span>Contabilidade e Assessoria</span>
        </Link>
        <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-header">
          Fale Conosco
        </a>
      </div>
    </header>
  );
}
