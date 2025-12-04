import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProjectShowcaseCopy } from "./types";

type ProjectShowcaseDesktopProps = {
  copy: ProjectShowcaseCopy;
};

const ProjectShowcaseDesktop = ({ copy }: ProjectShowcaseDesktopProps) => {
  return (
    <section
      id="project-showcase"
      className="relative isolate  px-6 py-20 text-white sm:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute inset-y-0 left-1/2 hidden w-[840px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_65%)] blur-[120px] lg:block" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-primary/80">
              {copy.badge}
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" aria-hidden />
            </span>

            <div className="space-y-3">
              <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                {copy.title}
              </h2>
              <p className="text-lg font-medium text-secondary/80">
                {copy.subtitle}
              </p>
            </div>

            <p className="text-base leading-relaxed text-white/70">
              {copy.description}
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-6">
            <p className="bg-gradient-to-r from-primary via-primary/70 to-white bg-clip-text text-7xl font-black tracking-tight text-transparent">
              {copy.highlightValue}
            </p>
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
              {copy.highlightLabel}
            </span>
          </div>

          <Link
            href={copy.ctaHref}
            className="inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.35em] text-white transition-all duration-500 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/20"
          >
            {copy.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="group relative">
          <div
            aria-hidden
            className="absolute -inset-x-10 top-8 h-64 rounded-full bg-primary/30 opacity-60 blur-[120px] transition-transform duration-700 group-hover:-translate-y-4"
          />

          <div className="relative aspect-video w-full overflow-hidden rounded-[40px] border border-primary/30 bg-gradient-to-br from-gray-900 via-[#0b0b17] to-black p-6 shadow-[0_55px_110px_rgba(124,58,237,0.25)] transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_65px_140px_rgba(124,58,237,0.4)]">
            <div className="absolute inset-0 rounded-[40px] border border-white/5 opacity-40" aria-hidden />
            <div className="absolute inset-[3px] rounded-[38px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_65%)] opacity-80" aria-hidden />

            <div className="relative flex h-full items-center justify-center rounded-[28px] border border-white/10 bg-black/30 text-sm font-semibold tracking-[0.5em] text-white/60">
              <span className="relative">
                <span className="absolute inset-0 -skew-y-2 bg-gradient-to-r from-primary/30 via-transparent to-primary/30 blur-md opacity-40" aria-hidden />
                <span className="relative">PROJECT PREVIEW</span>
              </span>
            </div>

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 top-12 h-40 w-40 rounded-full bg-primary/30 blur-[80px] opacity-70 transition-transform duration-700 group-hover:translate-x-6" />
              <div className="absolute -left-10 bottom-6 h-32 w-32 rounded-full bg-fuchsia-500/30 blur-[90px] opacity-60 transition-transform duration-700 group-hover:-translate-x-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcaseDesktop;
