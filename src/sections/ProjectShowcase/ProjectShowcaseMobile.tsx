import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProjectShowcaseCopy } from "./types";

type ProjectShowcaseMobileProps = {
  copy: ProjectShowcaseCopy;
};

const ProjectShowcaseMobile = ({ copy }: ProjectShowcaseMobileProps) => {
  return (
    <section id="project-showcase" className="px-5 py-16 text-white">
      <div className="mx-auto flex max-w-md flex-col gap-10">
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-x-6 top-6 h-48 rounded-full bg-primary/40 opacity-50 blur-[90px]"
          />
          <div className="relative aspect-video w-full overflow-hidden rounded-[32px] border border-primary/30 bg-gradient-to-br from-gray-900 via-[#0a0a16] to-black p-4 shadow-[0_35px_70px_rgba(124,58,237,0.25)]">
            <div className="absolute inset-[2px] rounded-[30px] border border-white/10" aria-hidden />
            <div className="relative flex h-full items-center justify-center rounded-[24px] border border-white/10 bg-black/40 text-xs font-semibold tracking-[0.5em] text-white/70">
              PROJECT PREVIEW
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-primary/80">
            {copy.badge}
            <span className="h-1 w-1 animate-pulse rounded-full bg-primary" aria-hidden />
          </span>

          <div className="space-y-3">
            <h2 className="text-3xl font-semibold leading-snug">
              {copy.title}
            </h2>
            <p className="text-base font-medium text-secondary/80">
              {copy.subtitle}
            </p>
            <p className="text-sm leading-relaxed text-white/70">
              {copy.description}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-6xl font-black tracking-tight text-primary">
            {copy.highlightValue}
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">
            {copy.highlightLabel}
          </p>
        </div>

        <Link
          href={copy.ctaHref}
          className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-primary/50 bg-primary/15 px-6 py-4 text-sm font-semibold uppercase tracking-[0.4em] text-white shadow-[0_25px_60px_rgba(124,58,237,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/25"
        >
          {copy.ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default ProjectShowcaseMobile;
