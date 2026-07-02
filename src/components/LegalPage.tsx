import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

type LegalPageProps = {
  title: string;
  sections: LegalSection[];
};

function currentDateBR() {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());
}

export function LegalPage({ title, sections }: LegalPageProps) {
  return (
    <section className="policy-page">
      <div className="container">
        <Link href="/" className="btn-back">
          <ArrowLeft aria-hidden="true" /> Voltar
        </Link>

        <div className="policy-header">
          <h1>{title}</h1>
          <p className="policy-date">Última atualização: {currentDateBR()}</p>
        </div>

        <div className="policy-content">
          {sections.map((section) => (
            <div className="policy-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="policy-footer">
          <Link href="/" className="btn-primary">
            Voltar para o Início
          </Link>
        </div>
      </div>
    </section>
  );
}
