import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SiteShell } from "@/components/SiteShell";
import { privacySections } from "@/data/legal";

export const metadata: Metadata = {
  title: "Política de Privacidade - Consultoria Azul",
  description: "Política de Privacidade da Consultoria Azul. Saiba como protegemos e utilizamos suas informações pessoais.",
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <LegalPage title="Política de Privacidade" sections={privacySections} />
    </SiteShell>
  );
}
