import Link from "next/link";
import { CtaLink } from "@/components/CtaLink";

export function Header() {
  return (
    <header className="header">
      <div className="container">
        <Link
          href="/"
          className="logo"
          aria-label="Página inicial da Consultoria Azul"
        >
          Braganholo e Ventura <span>Contabilidade e Assessoria</span>
        </Link>

        <CtaLink
          href="#"
          className="btn-header"
          message="Olá, gostaria de falar com um consultor!"
        >
          Fale Conosco
        </CtaLink>
      </div>
    </header>
  );
}