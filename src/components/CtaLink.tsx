"use client";

import React from "react";
import {
  buildWhatsAppRedirectPath,
  DEFAULT_WHATSAPP_MESSAGE,
} from "@/lib/whatsappRedirect";

type CtaLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  onlyScroll?: boolean;
  message?: string;
};

export function CtaLink({
  href = "#",
  children,
  className,
  onlyScroll,
  message,
  ...rest
}: CtaLinkProps) {
  const destination =
    onlyScroll && href.startsWith("#")
      ? href
      : buildWhatsAppRedirectPath(message || DEFAULT_WHATSAPP_MESSAGE);

  return (
    <a
      href={destination}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}
