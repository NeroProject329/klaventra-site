export function getWhatsappLink(message?: string) {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5500000000000";
  const number = rawNumber.replace(/\D/g, "");
  const text = message || process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Olá, gostaria de verificar meus descontos!";

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
