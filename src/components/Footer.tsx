import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <Link href="/" className="footer-logo" aria-label="Página inicial da Consultoria Azul">
            Consultoria<span>Azul</span>
          </Link>

          <p>Transformando desafios em oportunidades de crescimento para o seu negócio.</p>

          <div className="footer-company">
            <h3>Informações da empresa</h3>

            <div className="footer-company-grid">
              <div>
                <strong>CNPJ</strong>
                <span>52.856.160/0001-30</span>
              </div>

              <div>
                <strong>CRC</strong>
  
                <span>GO-004472/O</span>
              </div>

              <div>
                <strong>Razão Social</strong>
                <span>Braganholo e Ventura Contabilidade e Assessoria LTDA</span>
              </div>

              <div>
                <strong>Endereço</strong>
                <address>
                  Rua Guavira Oeste Esq. C/Rua Marte Sul, 134<br />
                  Quadra 27 Lote 09<br />
                  Centro - Chapadão do Céu - Goiás<br />
                  CEP: 75875-023
                </address>
              </div>

              <div>
                <strong>E-mail</strong>
                <a href="mailto:suporte@braganholoeventuraltda.com">
                  suporte@braganholoeventuraltda.com
                </a>
              </div>
            </div>
          </div>

          <div className="footer-seals">
            <Image src="/img/100.png" alt="Selo de Qualidade" width={340} height={148} />
            <Image src="/img/sgr.png" alt="Selo SGR" width={384} height={150} />
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 Braganholo e Ventura Contabilidade e Assessoria LTDA. Todos os direitos
            reservados.
          </p>

          <div className="footer-links">
            <Link href="/politica-privacidade" className="footer-link">
              Política de Privacidade
            </Link>
            <span>|</span>
            <Link href="/termos-uso" className="footer-link">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}