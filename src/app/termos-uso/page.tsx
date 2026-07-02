import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SiteShell } from "@/components/SiteShell";
import { termsSections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Termos de Uso - Consultoria Azul",
  description: "Termos de Uso da Consultoria Azul. Conheça nossos termos e condições de uso dos serviços.",
};

export default function TermsPage() {
  return (
    <SiteShell>
      <LegalPage title="Termos de Uso" sections={termsSections} />
    </SiteShell>
  );
}
