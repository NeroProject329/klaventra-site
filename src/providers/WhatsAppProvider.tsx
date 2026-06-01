"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type WhatsContextValue = {
  loading: boolean;
  phone: string;
  error: string | null;
  refresh: () => Promise<void>;
  open: (message?: string) => void;
};

const WhatsAppContext = createContext<WhatsContextValue | null>(null);

const API_BASE = process.env.NEXT_PUBLIC_ZAP_API_BASE;
const FALLBACK_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

function getDomain(): string {
  if (typeof window === "undefined") return "";
  return window.location.hostname.replace(/^www\./, "");
}

function onlyDigits(value: string) {
  return String(value || "").replace(/\D/g, "");
}

function buildWaUrl(phoneDigits: string, message?: string) {
  const phone = onlyDigits(phoneDigits);
  const text = encodeURIComponent(
    message || "Olá, gostaria de verificar meus descontos!"
  );

  return `https://wa.me/${phone}?text=${text}`;
}

async function fetchPhoneByDomain(domain: string, signal?: AbortSignal) {
  if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_ZAP_API_BASE não configurada");
  }

  const url = `${API_BASE}/zap?domain=${encodeURIComponent(domain)}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  const phone =
    onlyDigits(data?.phone) ||
    onlyDigits(data?.numero) ||
    onlyDigits(data?.data?.phone) ||
    onlyDigits(data?.data?.numero);

  if (!phone) {
    throw new Error("Número não retornado");
  }

  return phone;
}

export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const domain = getDomain();

    setLoading(true);

    try {
      const phoneFromApi = await fetchPhoneByDomain(domain);
      setPhone(phoneFromApi);
      setError(null);
    } catch {
      const fallback = onlyDigits(FALLBACK_PHONE);

      if (fallback) {
        setPhone(fallback);
        setError(null);
      } else {
        setPhone("");
        setError("WhatsApp indisponível no momento.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const open = useCallback(
    (message?: string) => {
      if (loading) return;

      if (!phone) {
        alert(error || "WhatsApp indisponível no momento.");
        return;
      }

      const url = buildWaUrl(phone, message);
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [loading, phone, error]
  );

  return (
    <WhatsAppContext.Provider value={{ loading, phone, error, refresh, open }}>
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp() {
  const context = useContext(WhatsAppContext);

  if (!context) {
    throw new Error("useWhatsApp precisa estar dentro do WhatsAppProvider");
  }

  return context;
}