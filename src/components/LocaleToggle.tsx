"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";

interface LocaleToggleProps {
  currentLocale: Locale;
  labels: Record<Locale, string>;
  ariaLabel: string;
}

const LocaleToggle = ({ currentLocale, labels, ariaLabel }: LocaleToggleProps) => {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHash(window.location.hash);
    }
  }, [pathname]);

  const targetLocale: Locale = currentLocale === "pt" ? "en" : "pt";
  const segments = pathname.split("/").filter(Boolean);
  const rest = segments.slice(1).join("/");
  const href = `/${targetLocale}${rest ? `/${rest}` : ""}${hash}`;

  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className="topbar-btn text-[#746A76] tracking-widest"
    >
      <Link href={href} aria-label={`${ariaLabel} ${labels[targetLocale]}`}>
        {labels[targetLocale]}
      </Link>
    </Button>
  );
};

export default LocaleToggle;
