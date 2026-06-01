"use client";

import React from "react";
import { useWhatsApp } from "@/providers/WhatsAppProvider";

type CtaLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  onlyScroll?: boolean;
  message?: string;
};

const DEFAULT_MESSAGE = "Olá, gostaria de verificar meus descontos!";

export function CtaLink({
  href = "#",
  children,
  className,
  onlyScroll,
  message,
  ...rest
}: CtaLinkProps) {
  const { open, loading } = useWhatsApp();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onlyScroll && href.startsWith("#")) {
      return;
    }

    event.preventDefault();

    if (loading) return;

    open(message || DEFAULT_MESSAGE);
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      style={{ pointerEvents: loading && !onlyScroll ? "none" : undefined }}
      {...rest}
    >
      {children}
    </a>
  );
}