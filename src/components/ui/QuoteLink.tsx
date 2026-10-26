"use client";

import Link from "next/link";
import { useBudget } from "@/lib/budget";
import { track } from "@/lib/analytics";

/** Enlace a contacto que fija el modelo en el presupuesto antes de navegar. */
export function QuoteLink({
  href,
  slug,
  className,
  children,
  location,
}: {
  href: string;
  slug: string | null;
  className?: string;
  children: React.ReactNode;
  location: string;
}) {
  const { selectModel, slug: current } = useBudget();
  return (
    <Link
      href={slug ? `${href}?modelo=${slug}` : href}
      className={className}
      onClick={() => {
        if (slug && slug !== current) selectModel(slug);
        track("budget_request_click", { model: slug ?? "custom", location });
      }}
    >
      {children}
    </Link>
  );
}
