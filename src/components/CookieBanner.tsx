"use client";

import Link from "next/link";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      const choice = localStorage.getItem("cookieConsent");
      if (choice) {
        setHidden(true);
        return;
      }
    } catch {
      // Ignora indisponibilidade do localStorage.
    }

    const timer = window.setTimeout(() => setVisible(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  function handleChoice(choice: "accepted" | "rejected") {
    try {
      localStorage.setItem("cookieConsent", choice);
    } catch {
      // Ignora indisponibilidade do localStorage.
    }
    setVisible(false);
    setHidden(true);
  }

  return (
    <div id="cookie-banner" className={`cookie-banner${visible ? " show" : ""}${hidden ? " hide-permanently" : ""}`}>
      <div className="cookie-content">
        <div className="cookie-text">
          <Cookie aria-hidden="true" />
          <div>
            <strong>Utilizamos cookies</strong>
            <p>
              Este site utiliza cookies para garantir a melhor experiência possível. Ao continuar navegando, você concorda com nossa{" "}
              <Link href="/politica-privacidade">Política de Privacidade</Link> e{" "}
              <Link href="/termos-uso">Termos de Uso</Link>.
            </p>
          </div>
        </div>
        <div className="cookie-buttons">
          <button type="button" className="btn-cookie reject" onClick={() => handleChoice("rejected")}>
            Rejeitar
          </button>
          <button type="button" className="btn-cookie accept" onClick={() => handleChoice("accepted")}>
            Aceitar todos os Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
