export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, gostaria de verificar meus descontos!";

export function buildWhatsAppRedirectPath(
  message = DEFAULT_WHATSAPP_MESSAGE,
): string {
  const params = new URLSearchParams({
    message: message.trim() || DEFAULT_WHATSAPP_MESSAGE,
  });

  return `/api/whatsapp?${params.toString()}`;
}
