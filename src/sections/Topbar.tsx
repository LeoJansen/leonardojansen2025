"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import LocaleToggle from "@/components/LocaleToggle";
import type { Locale } from "@/i18n/config";

type NavItem = {
  label: string;
  href: string;
};

type TopbarProps = {
  items: NavItem[];
  currentLocale: Locale;
  localeLabels: Record<Locale, string>;
  ariaLabel: string;
};

const Topbar = ({ items, currentLocale, localeLabels, ariaLabel }: TopbarProps) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power1.inOut" },
      });

      timeline
        .to(".topbar-btn", {
          autoAlpha: 0.86,
          scale: 0.998,
          opacity: 0.86,
          duration: 0.7895,
          stagger: { each: 0.7891 },
        })
        .to(".topbar-btn", {
          autoAlpha: 1,
          opacity: 1,
          scale: 1,
          duration: 0.7895,
          stagger: { each: 0.7891 },
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={containerRef}
      className="absolute flex h-16 w-full items-center justify-center z-50"
    >
      <div className="fixed flex h-10 items-center gap-8 rounded-[20px] bg-[#0000002a] px-8 hover:bg-[#080808] hover:backdrop-blur-[1px] transition-all">
        {items.map((item) => (
          <Button
            key={item.href}
            asChild
            variant="ghost"
            size="sm"
            className="topbar-btn text-[#746A76] tracking-widest"
          >
            <a href={item.href}>{item.label}</a>
          </Button>
        ))}
        <LocaleToggle
          currentLocale={currentLocale}
          labels={localeLabels}
          ariaLabel={ariaLabel}
        />
      </div>
    </nav>
  );
};

export default Topbar;
