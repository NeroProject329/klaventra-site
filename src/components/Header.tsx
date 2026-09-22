import Link from "next/link";
import { Headphones } from "lucide-react";
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
          <span className="logo-icon" aria-hidden="true">
            <Headphones />
          </span>
          <span>Consultoria <strong>Azul</strong></span>
        </Link>

        <nav className="header-nav" aria-label="Navegação principal">
          <Link href="#diferenciais">Diferenciais</Link>
          <Link href="#processo">Como funciona</Link>
          <Link href="#depoimentos">Depoimentos</Link>
        </nav>

        <CtaLink
          href="#"
          className="btn-header"
          message="Olá, gostaria de falar com um consultor!"
        >
          Consultar agora
        </CtaLink>
      </div>
    </header>
  );
}
