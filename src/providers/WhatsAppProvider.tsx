"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

type ZapRoute = {
  routeType: "ADS" | "BASE";
  trackingCode: string | null;
  phoneNumber: string;
  displayName: string;
  message: string;
  waUrl: string;
  reservationExpiresAt: string | null;
};

type WhatsAppContextValue = {
  loading: boolean;
  phone: string;
  error: string | null;
  refresh: () => Promise<void>;
  open: (message?: string) => void;
};

const WhatsAppContext =
  createContext<WhatsAppContextValue | null>(null);

const API_BASE =
  process.env.NEXT_PUBLIC_ZAP_API_BASE || "";

const FALLBACK_PHONE =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

const LOCAL_TEST_DOMAIN =
  process.env.NEXT_PUBLIC_ZAP_TEST_DOMAIN || "";

function onlyDigits(value: unknown): string {
  return String(value ?? "").replace(/\D/g, "");
}

function normalizeDomain(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .split("/")[0]
    .split(":")[0]
    .replace(/^www\./, "")
    .replace(/\.$/, "");
}

function getDomain(): string {
  if (typeof window === "undefined") return "";

  const currentDomain = normalizeDomain(
    window.location.hostname,
  );

  const isLocal =
    currentDomain === "localhost" ||
    currentDomain === "127.0.0.1";

  if (isLocal && LOCAL_TEST_DOMAIN) {
    return normalizeDomain(LOCAL_TEST_DOMAIN);
  }

  return currentDomain;
}

function getApiBase(): string {
  return API_BASE
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/api\/v1$/i, "");
}

function buildWaUrl(
  phoneValue: string,
  message: string,
): string {
  const phone = onlyDigits(phoneValue);
  const text = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${text}`;
}

function buildMessage(
  route: ZapRoute,
  customMessage?: string,
): string {
  const message =
    customMessage?.trim() ||
    route.message ||
    "Olá! Gostaria de atendimento.";

  if (
    route.routeType === "ADS" &&
    route.trackingCode &&
    !message.includes(route.trackingCode)
  ) {
    return `${message}\nRef: ${route.trackingCode}`;
  }

  return message;
}

async function fetchRouteByDomain(
  domain: string,
  signal?: AbortSignal,
): Promise<ZapRoute> {
  const apiBase = getApiBase();

  if (!apiBase) {
    throw new Error(
      "NEXT_PUBLIC_ZAP_API_BASE não configurada.",
    );
  }

  if (!domain) {
    throw new Error(
      "Não foi possível identificar o domínio do site.",
    );
  }

  const url =
    `${apiBase}/zap?domain=${encodeURIComponent(domain)}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `A API de roteamento respondeu com HTTP ${response.status}.`,
    );
  }

  const data = (await response.json()) as Partial<ZapRoute>;

  const phoneNumber = onlyDigits(data.phoneNumber);

  if (!phoneNumber) {
    throw new Error(
      "A API não retornou um número válido.",
    );
  }

  if (
    data.routeType !== "ADS" &&
    data.routeType !== "BASE"
  ) {
    throw new Error(
      "A API retornou um tipo de rota inválido.",
    );
  }

  return {
    routeType: data.routeType,
    trackingCode:
      typeof data.trackingCode === "string"
        ? data.trackingCode
        : null,
    phoneNumber,
    displayName:
      typeof data.displayName === "string"
        ? data.displayName
        : "",
    message:
      typeof data.message === "string"
        ? data.message
        : "Olá! Gostaria de atendimento.",
    waUrl:
      typeof data.waUrl === "string"
        ? data.waUrl
        : "",
    reservationExpiresAt:
      typeof data.reservationExpiresAt === "string"
        ? data.reservationExpiresAt
        : null,
  };
}

export function WhatsAppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState(
    () => onlyDigits(FALLBACK_PHONE),
  );
  const [error, setError] =
    useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const route = await fetchRouteByDomain(
        getDomain(),
      );

      setPhone(route.phoneNumber);
    } catch (caught) {
      const fallback = onlyDigits(FALLBACK_PHONE);

      if (fallback) {
        setPhone(fallback);
        setError(null);
      } else {
        setPhone("");
        setError(
          caught instanceof Error
            ? caught.message
            : "WhatsApp indisponível no momento.",
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const open = useCallback(
    (customMessage?: string) => {
      if (loading) return;

      /*
       * A janela precisa ser criada diretamente no clique.
       * Caso ela fosse aberta somente depois do await,
       * o navegador poderia bloquear como popup.
       */
      const whatsappWindow = window.open(
        "about:blank",
        "_blank",
      );

      if (!whatsappWindow) {
        window.alert(
          "Permita popups neste site para abrir o WhatsApp.",
        );
        return;
      }

      whatsappWindow.opener = null;
      setLoading(true);
      setError(null);

      void (async () => {
        try {
          /*
           * A rota é solicitada no clique, e não ao carregar
           * a página. Assim somente um clique real reserva
           * uma posição da fila ADS.
           */
          const route = await fetchRouteByDomain(
            getDomain(),
          );

          setPhone(route.phoneNumber);

          const finalMessage = buildMessage(
            route,
            customMessage,
          );

          whatsappWindow.location.replace(
            buildWaUrl(
              route.phoneNumber,
              finalMessage,
            ),
          );
        } catch (caught) {
          const fallback = onlyDigits(
            FALLBACK_PHONE,
          );

          if (fallback) {
            setPhone(fallback);

            whatsappWindow.location.replace(
              buildWaUrl(
                fallback,
                customMessage?.trim() ||
                  "Olá! Gostaria de atendimento.",
              ),
            );

            return;
          }

          const errorMessage =
            caught instanceof Error
              ? caught.message
              : "WhatsApp indisponível no momento.";

          whatsappWindow.close();
          setPhone("");
          setError(errorMessage);
          window.alert(errorMessage);
        } finally {
          setLoading(false);
        }
      })();
    },
    [loading],
  );

  return (
    <WhatsAppContext.Provider
      value={{
        loading,
        phone,
        error,
        refresh,
        open,
      }}
    >
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp(): WhatsAppContextValue {
  const context = useContext(WhatsAppContext);

  if (!context) {
    throw new Error(
      "useWhatsApp precisa estar dentro do WhatsAppProvider.",
    );
  }

  return context;
}