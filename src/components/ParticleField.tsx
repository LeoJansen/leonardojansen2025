"use client";

import { useEffect, useId, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const DEFAULT_PARTICLE_CLASS =
  "absolute top-0 left-0 h-[5px] w-[5px] rounded-full bg-[#9500F8] opacity-0 shadow-[0_0_12px_rgba(245,230,255,0.95)] mix-blend-screen";

const DEFAULT_CONTAINER_CLASS = "pointer-events-none absolute inset-0 z-20 overflow-hidden";
const DEFAULT_STARFIELD_CLASS = "absolute inset-0 -z-10 opacity-70 pointer-events-none";

const STARFIELD_COLORS = [
  "rgba(118 40 235 / 0.55)",
  "rgba(183 116 247 / 0.6)",
  "rgba(194, 16, 255, 0.45)",
  "rgba(247, 96, 236, 0.5)",
];

const createStarfieldBackground = (layers: number): string => {
  return Array.from({ length: layers })
    .map(() => {
      const radius = (Math.random() * 1.8 + 0.6).toFixed(2);
      const positionX = Math.random() * 100;
      const positionY = Math.random() * 100;
      const color = STARFIELD_COLORS[Math.floor(Math.random() * STARFIELD_COLORS.length)];

      return `radial-gradient(${radius}px ${radius}px at ${positionX}% ${positionY}%, ${color}, transparent 65%)`;
    })
    .join(", ");
};

export type ParticleFieldProps = {
  count?: number;
  className?: string;
  particleClassName?: string;
  showStarfield?: boolean;
  starfieldClassName?: string;
};

const ParticleField = ({
  count = 14,
  className,
  particleClassName,
  showStarfield = true,
  starfieldClassName,
}: ParticleFieldProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const particleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const particles = useMemo(() => Array.from({ length: count }), [count]);
  const reactId = useId();
  const generatedStarfieldClass = useMemo(
    () => `generated-starfield-${reactId.replace(/:/g, "-")}`,
    [reactId]
  );
  const starfieldStyleElement = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (!showStarfield) {
      if (starfieldStyleElement.current) {
        starfieldStyleElement.current.remove();
        starfieldStyleElement.current = null;
      }
      return;
    }

    const styleEl = starfieldStyleElement.current ?? document.createElement("style");
    styleEl.dataset.starfieldId = generatedStarfieldClass;
    styleEl.textContent = `.${generatedStarfieldClass}{background-image:${createStarfieldBackground(Math.max(count * 2, 32))};background-repeat:no-repeat;background-size:100% 100%;}`;

    if (!styleEl.isConnected) {
      document.head.appendChild(styleEl);
    }

    starfieldStyleElement.current = styleEl;

    return () => {
      if (starfieldStyleElement.current) {
        starfieldStyleElement.current.remove();
        starfieldStyleElement.current = null;
      }
    };
  }, [showStarfield, count, generatedStarfieldClass]);

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
    const endX = gsap.utils.clamp(0, width, startX + gsap.utils.random(-width * 0.4, width * 0.4));
    const endY = gsap.utils.clamp(0, height, startY + gsap.utils.random(-height * 0.5, height * 0.5));
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
        <div
          aria-hidden
          className={cn(DEFAULT_STARFIELD_CLASS, generatedStarfieldClass, starfieldClassName)}
        />
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
