"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FinalUplinkDesktop = dynamic(() => import("./FinalUplinkDesktop"), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

const FinalUplinkMobile = dynamic(() => import("./FinalUplinkMobile"), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

const FinalUplink = () => {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return <SectionSkeleton />;
  }

  return isMobile ? <FinalUplinkMobile /> : <FinalUplinkDesktop />;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const evaluate = () => setIsMobile(window.innerWidth < 768);

    evaluate();
    window.addEventListener("resize", evaluate);

    return () => window.removeEventListener("resize", evaluate);
  }, []);

  return isMobile;
};

const SectionSkeleton = () => (
  <section className="relative overflow-hidden px-6 py-20">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-purple-900/70 to-black/80" />
    <div className="relative mx-auto max-w-4xl animate-pulse space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-white/50">
      <div className="h-4 w-28 rounded-full bg-white/10" />
      <div className="h-10 w-80 rounded-full bg-white/15" />
      <div className="h-4 w-64 rounded-full bg-white/10" />
      <div className="h-12 w-full rounded-2xl bg-white/10" />
    </div>
  </section>
);

export default FinalUplink;
