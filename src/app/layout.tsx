import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Consultoria Azul - Descontos de até 98%",
  description: "Descontos de até 98%. Fique hoje mesmo no Azul. Verifique as ofertas disponíveis para você e consulte sua situação.",
  icons: {
    icon: "/img/icons8-verificado-96.png",
  },
  openGraph: {
    type: "website",
    title: "Consultoria Azul - Descontos de até 98%",
    description: "Descontos de até 98%. Fique hoje mesmo no Azul. Verifique as ofertas disponíveis para você e consulte sua situação.",
  },
  twitter: {
    card: "summary",
    title: "Consultoria Azul - Descontos de até 98%",
    description: "Descontos de até 98%. Fique hoje mesmo no Azul. Verifique as ofertas disponíveis para você e consulte sua situação.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
