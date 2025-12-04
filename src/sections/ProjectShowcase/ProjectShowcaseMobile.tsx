"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Brain, HardHat, HeartHandshake } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import type { ProjectShowcaseCopy, ProjectShowcaseTheme } from "./types";
import { PROJECT_THEME_MAP } from "./themeConfig";

type ProjectShowcaseMobileProps = {
  copy: ProjectShowcaseCopy;
};

const iconMap = {
  hardHat: HardHat,
  brain: Brain,
  heartHandshake: HeartHandshake,
};

const fallbackTheme: ProjectShowcaseTheme = "amber";

const ProjectShowcaseMobile = ({ copy }: ProjectShowcaseMobileProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const registerCardRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current[index] = el;
    }
  };

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const targets = cardRefs.current.filter((card): card is HTMLDivElement => Boolean(card));

      if (targets.length) {
        gsap.from(targets, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [copy] }
  );

  return (
    <section id="project-showcase" ref={sectionRef} className="px-5 py-16 text-white">
      <div className="mx-auto max-w-md space-y-8">
        <header className="space-y-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-primary/80">
            {copy.badge}
            <span className="h-1 w-1 animate-pulse rounded-full bg-primary" aria-hidden />
          </span>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold leading-snug">{copy.title}</h2>
            <p className="text-sm text-white/70">{copy.subtitle}</p>
          </div>
        </header>

        <div className="space-y-8">
          {copy.projects.map((project, index) => {
            const theme = PROJECT_THEME_MAP[project.theme ?? fallbackTheme] ?? PROJECT_THEME_MAP[fallbackTheme];
            const Icon = iconMap[project.icon] ?? HardHat;

            return (
              <article
                key={project.id}
                ref={registerCardRef(index)}
                className={cn(
                  "rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md",
                  theme.borderClass
                )}
              >
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute inset-x-4 top-3 h-32 rounded-full bg-primary/30 blur-[80px]" aria-hidden />
                    <div
                      className={cn(
                        "relative aspect-video w-full overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-br p-4",
                        theme.mockupGradient
                      )}
                    >
                      <div className="absolute inset-[1px] rounded-[24px] border border-white/10" aria-hidden />
                      <div className="relative flex h-full items-center justify-center rounded-[20px] border border-white/10 bg-black/30 text-[0.65rem] font-semibold tracking-[0.4em] text-white/60">
                        PROJECT PREVIEW
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className={cn("inline-flex items-center gap-3 text-[0.55rem] font-semibold uppercase tracking-[0.45em]", theme.accentText)}>
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5" strokeWidth={1.4} />
                      </span>
                      {project.category}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold">{project.title}</h3>
                      <p className="text-sm leading-relaxed text-white/70">{project.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "rounded-full px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.25em]",
                          theme.tagClass
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={project.ctaHref}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.4em]"
                  >
                    {project.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcaseMobile;
