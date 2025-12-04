"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { ProjectShowcaseProps } from "./types";

const ProjectShowcaseDesktop = dynamic<ProjectShowcaseProps>(
  () => import("./ProjectShowcaseDesktop"),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

const ProjectShowcaseMobile = dynamic<ProjectShowcaseProps>(
  () => import("./ProjectShowcaseMobile"),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

const ProjectShowcase = ({ copy }: ProjectShowcaseProps) => {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return <SectionSkeleton />;
  }

  return isMobile ? (
    <ProjectShowcaseMobile copy={copy} />
  ) : (
    <ProjectShowcaseDesktop copy={copy} />
  );
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const evaluate = () => {
      setIsMobile(window.innerWidth < 768);
    };

    evaluate();
    window.addEventListener("resize", evaluate);

    return () => window.removeEventListener("resize", evaluate);
  }, []);

  return isMobile;
};

const SectionSkeleton = () => (
  <section className="px-6 py-20">
    <div className="mx-auto max-w-4xl animate-pulse space-y-6 rounded-3xl border border-white/5 bg-white/5 p-8 text-white/40">
      <div className="h-4 w-36 rounded-full bg-white/10" />
      <div className="h-9 w-72 rounded-full bg-white/15" />
      <div className="h-4 w-64 rounded-full bg-white/5" />
      <div className="h-48 rounded-2xl bg-white/5" />
    </div>
  </section>
);

export default ProjectShowcase;
