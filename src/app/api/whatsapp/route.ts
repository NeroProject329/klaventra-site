import { NextRequest, NextResponse } from "next/server";

import { DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsappRedirect";

export const dynamic = "force-dynamic";

const ROUTE_TIMEOUT_MS = 10_000;

type ZapRouteResponse = {
  phoneNumber?: unknown;
  message?: unknown;
};

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

function getDomain(request: NextRequest): string {
  const forwardedHost = request.headers
    .get("x-forwarded-host")
    ?.split(",")[0];
  const domain = normalizeDomain(
    forwardedHost || request.headers.get("host") || request.nextUrl.hostname,
  );

  if (
    (domain === "localhost" || domain === "127.0.0.1") &&
    process.env.NEXT_PUBLIC_ZAP_TEST_DOMAIN
  ) {
    return normalizeDomain(process.env.NEXT_PUBLIC_ZAP_TEST_DOMAIN);
  }

  return domain;
}

function getApiBase(): string {
  return (process.env.NEXT_PUBLIC_ZAP_API_BASE || "")
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/api\/v1$/i, "");
}

function buildWaUrl(phoneValue: unknown, message: string): string | null {
  const phone = onlyDigits(phoneValue);

  if (!phone) return null;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function redirectToWhatsApp(url: string): NextResponse {
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Cache-Control", "no-store, max-age=0");
  return response;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const customMessage = request.nextUrl.searchParams.get("message")?.trim();
  const apiBase = getApiBase();
  const domain = getDomain(request);

  try {
    if (!apiBase || !domain) {
      throw new Error("Roteamento do WhatsApp não configurado.");
    }

    const response = await fetch(
      `${apiBase}/zap?domain=${encodeURIComponent(domain)}`,
      {
        method: "GET",
        cache: "no-store",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(ROUTE_TIMEOUT_MS),
      },
    );

    if (!response.ok) {
      throw new Error(`A API de roteamento respondeu com HTTP ${response.status}.`);
    }

    const route = (await response.json()) as ZapRouteResponse;
    const routeMessage =
      customMessage ||
      (typeof route.message === "string" && route.message.trim()) ||
      DEFAULT_WHATSAPP_MESSAGE;
    const waUrl = buildWaUrl(route.phoneNumber, routeMessage);

    if (!waUrl) {
      throw new Error("A API não retornou um número válido.");
    }

    return redirectToWhatsApp(waUrl);
  } catch (error) {
    const fallbackUrl = buildWaUrl(
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
      customMessage || DEFAULT_WHATSAPP_MESSAGE,
    );

    if (fallbackUrl) {
      return redirectToWhatsApp(fallbackUrl);
    }

    console.error("Falha ao direcionar para o WhatsApp:", error);

    return NextResponse.json(
      {
        error: "WhatsApp indisponível no momento. Tente novamente em instantes.",
      },
      {
        status: 503,
        headers: { "Cache-Control": "no-store, max-age=0" },
      },
    );
  }
}
