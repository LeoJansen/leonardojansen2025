"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const DEFAULT_PARTICLE_CLASS =
  "absolute top-0 left-0 h-[5px] w-[5px] rounded-full bg-[#9500F8] opacity-0 shadow-[0_0_12px_rgba(245,230,255,0.95)] mix-blend-screen";

const DEFAULT_CONTAINER_CLASS = "pointer-events-none absolute inset-0 z-20 overflow-hidden";
const DEFAULT_STARFIELD_CLASS = "absolute inset-0 -z-10 opacity-70 star-field-pattern";

export type ParticleFieldProps = {
  count?: number;
  className?: string;
  particleClassName?: string;
  showStarfield?: boolean;
  starfieldClassName?: string;
};

const ParticleField = ({
  count = 12,
  className,
  particleClassName,
  showStarfield = true,
  starfieldClassName,
}: ParticleFieldProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const particles = useMemo(() => Array.from({ length: count }), [count]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    particleRefs.current.length = count;

    const ctx = gsap.context(() => {
      const animateParticle = (particle: HTMLSpanElement): void => {
        const rect = container.getBoundingClientRect();
        const width = rect.width || (typeof window !== "undefined" ? window.innerWidth : 0);
        const height = rect.height || (typeof window !== "undefined" ? window.innerHeight : 0);

        if (!width || !height) {
          return;
        }

        const startX = gsap.utils.random(0, width);
        const startY = gsap.utils.random(0, height);
        const endX = gsap.utils.random(startX - width * 0.4, startX + width * 0.4);
        const endY = gsap.utils.random(startY - height * 0.5, startY + height * 0.5);
        const peakOpacity = gsap.utils.random(0.75, 1);
        const scale = gsap.utils.random(0.35, 0.75);
        const fadeInDuration = gsap.utils.random(0.6, 1.4);
        const floatDuration = gsap.utils.random(18, 48);
        const startDelay = gsap.utils.random(0, 2.5);

        gsap.set(particle, {
          x: startX,
          y: startY,
          opacity: 0,
          scale,
        });

        gsap
          .timeline({ onComplete: () => animateParticle(particle), delay: startDelay })
          .to(particle, {
            opacity: peakOpacity,
            duration: fadeInDuration,
            ease: "sine.inOut",
          })
          .to(
            particle,
            {
              x: endX,
              y: endY,
              opacity: 0,
              duration: floatDuration,
              ease: "sine.inOut",
            },
            "+=0"
          );
      };

      particleRefs.current.slice(0, count).forEach((particle) => {
        if (particle) {
          animateParticle(particle);
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [count]);

  return (
    <div ref={containerRef} className={cn(DEFAULT_CONTAINER_CLASS, className)}>
      {showStarfield ? (
        <div aria-hidden className={cn(DEFAULT_STARFIELD_CLASS, starfieldClassName)} />
      ) : null}
      {particles.map((_, index) => (
        <span
          key={index}
          ref={(el) => {
            particleRefs.current[index] = el;
          }}
          className={cn(DEFAULT_PARTICLE_CLASS, particleClassName)}
        />
      ))}
    </div>
  );
};

export default ParticleField;
