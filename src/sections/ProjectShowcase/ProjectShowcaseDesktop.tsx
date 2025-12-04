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

type ProjectShowcaseDesktopProps = {
  copy: ProjectShowcaseCopy;
};

const iconMap = {
  hardHat: HardHat,
  brain: Brain,
  heartHandshake: HeartHandshake,
};

const fallbackTheme: ProjectShowcaseTheme = "amber";

const ProjectShowcaseDesktop = ({ copy }: ProjectShowcaseDesktopProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const mockupRefs = useRef<HTMLDivElement[]>([]);

  const registerCardRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      cardRefs.current[index] = el;
    }
  };

  const registerMockupRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      mockupRefs.current[index] = el;
    }
  };

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const hoverCleanups: Array<() => void> = [];

      copy.projects.forEach((project, index) => {
        const card = cardRefs.current[index];
        const mockup = mockupRefs.current[index];
        const theme = PROJECT_THEME_MAP[project.theme ?? fallbackTheme] ?? PROJECT_THEME_MAP[fallbackTheme];

        if (card) {
          gsap.from(card, {
            opacity: 0,
            y: 80,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            },
          });

          const handleEnter = () => {
            if (mockup) {
              gsap.to(mockup, {
                scale: 1.04,
                duration: 0.6,
                ease: "power2.out",
              });
            }

            gsap.to(card, {
              boxShadow: theme.glowShadow,
              borderColor: theme.borderGlow,
              duration: 0.45,
              ease: "power2.out",
            });
          };

          const handleLeave = () => {
            if (mockup) {
              gsap.to(mockup, {
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
              });
            }

            gsap.to(card, {
              boxShadow: "0 0 0 rgba(0,0,0,0)",
              borderColor: "rgba(255,255,255,0.08)",
              duration: 0.5,
              ease: "power2.out",
            });
          };

          card.addEventListener("mouseenter", handleEnter);
          card.addEventListener("mouseleave", handleLeave);
          hoverCleanups.push(() => {
            card.removeEventListener("mouseenter", handleEnter);
            card.removeEventListener("mouseleave", handleLeave);
          });
        }
      });

      return () => {
        hoverCleanups.forEach((cleanup) => cleanup());
      };
    },
    { scope: sectionRef, dependencies: [copy] }
  );

  return (
    <section
      id="project-showcase"
      ref={sectionRef}
      className="relative isolate px-6 py-20 text-white sm:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute inset-y-0 left-1/2 hidden w-[840px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_65%)] blur-[120px] lg:block" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <header className="space-y-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-primary/80">
            {copy.badge}
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" aria-hidden />
          </span>
          <div className="space-y-3">
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl">{copy.title}</h2>
            <p className="text-base text-white/70 md:text-lg">{copy.subtitle}</p>
          </div>
        </header>

        <div className="space-y-10">
          {copy.projects.map((project, index) => {
            const theme = PROJECT_THEME_MAP[project.theme ?? fallbackTheme] ?? PROJECT_THEME_MAP[fallbackTheme];
            const Icon = iconMap[project.icon] ?? HardHat;
            const isEven = index % 2 === 0;

            return (
              <article
                key={project.id}
                ref={registerCardRef(index)}
                className={cn(
                  "project-card rounded-[32px] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md",
                  theme.borderClass
                )}
              >
                <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                  <div className={cn("space-y-6", isEven ? "order-2 lg:order-1" : "order-2 lg:order-2")}>
                    <div className="space-y-4">
                      <div className={cn("inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.45em]", theme.accentText)}>
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                          <Icon className="h-5 w-5" strokeWidth={1.4} />
                        </span>
                        {project.category}
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-3xl font-semibold tracking-tight">{project.title}</h3>
                        <p className="text-base leading-relaxed text-white/70">{project.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className={cn(
                            "rounded-full px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em]",
                            theme.tagClass
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={project.ctaHref}
                      className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em]"
                    >
                      {project.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className={cn("order-1", isEven ? "lg:order-2" : "lg:order-1")}>
                    <div
                      ref={registerMockupRef(index)}
                      className={cn(
                        "relative aspect-video w-full overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br p-6",
                        theme.borderClass,
                        theme.mockupGradient
                      )}
                    >
                      <div className="absolute inset-[2px] rounded-[30px] border border-white/10" aria-hidden />
                      <div className="relative flex h-full items-center justify-center rounded-[24px] border border-white/10 bg-black/30 text-sm font-semibold tracking-[0.4em] text-white/60">
                        PROJECT PREVIEW
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcaseDesktop;
