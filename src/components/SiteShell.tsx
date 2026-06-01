import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
