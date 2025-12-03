"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SalesMachinesDesktop = dynamic(() => import("./SalesMachinesDesktop"), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

const SalesMachinesMobile = dynamic(() => import("./SalesMachinesMobile"), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

const SalesMachines = () => {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return <SectionSkeleton />;
  }

  return isMobile ? <SalesMachinesMobile /> : <SalesMachinesDesktop />;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    handleChange(mediaQuery);

    const listener = (event: MediaQueryListEvent) => handleChange(event);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }

    mediaQuery.addListener(listener);
    return () => mediaQuery.removeListener(listener);
  }, []);

  return isMobile;
};

const SectionSkeleton = () => (
  <section className="px-6 py-20">
    <div className="mx-auto max-w-5xl animate-pulse space-y-6 rounded-3xl border border-white/5 bg-white/5 p-8 text-white/40">
      <div className="h-4 w-40 rounded-full bg-white/10" />
      <div className="h-8 w-72 rounded-full bg-white/10" />
      <div className="h-4 w-64 rounded-full bg-white/5" />
      <div className="h-48 rounded-2xl bg-white/5" />
    </div>
  </section>
);

export default SalesMachines;
