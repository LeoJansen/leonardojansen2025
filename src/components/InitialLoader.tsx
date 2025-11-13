"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const MIN_DURATION_MS = 600;

export type InitialLoaderCopy = {
  message: string;
  progressLabel: string;
  logoAlt?: string;
  greeting?: string;
};

type InitialLoaderProps = {
  children: ReactNode;
  copy?: InitialLoaderCopy;
  minimumShowTime?: number;
};

const isBrowser = typeof window !== "undefined";

const InitialLoader = ({
  children,
  copy,
  minimumShowTime = 1400,
}: InitialLoaderProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const previousOverflow = useRef<string>("");
  const [showOverlay, setShowOverlay] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    if (!showOverlay) {
      document.body.style.overflow = previousOverflow.current;
    }
  }, [showOverlay]);

  useEffect(() => {
    if (!wrapperRef.current || !overlayRef.current || !contentRef.current) {
      return;
    }

    const prefersReducedMotion =
      isBrowser && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const logoParts = gsap.utils.toArray<SVGPathElement>(".loader__logo-part");

    if (prefersReducedMotion) {
      gsap.set([contentRef.current, ".loader__greeting", ".loader__tagline"], {
        autoAlpha: 1,
        y: 0,
      });
      gsap.set(logoParts, { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
      setProgress(100);
      setShowOverlay(false);
      return;
    }

    const effectiveDuration = Math.max(minimumShowTime, MIN_DURATION_MS) / 1000;

    const ctx = gsap.context(() => {
      const progressProxy = { value: 0 };

      gsap.set(contentRef.current, { autoAlpha: 0 });
      gsap.set(logoParts, {
        autoAlpha: 0,
        y: 48,
        scale: 0.16,
        rotate: -40,
        transformOrigin: "50% 50%",
      });
      gsap.set(".loader__greeting", { autoAlpha: 0, y: 24 });
      gsap.set(".loader__tagline", { autoAlpha: 0, y: 12 });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      timeline
        .to(logoParts, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 1.9,
          ease: "power3.out",
          stagger: 1.2,
        })
        .fromTo(
          ".loader__greeting",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 1.6 },
          "-=0.25"
        )
        .fromTo(
          ".loader__tagline",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 1.6 },
          "-=0.3"
        )
        .fromTo(
          ".loader__progress",
          { scaleX: 0 },
          { scaleX: 1, duration: effectiveDuration, ease: "power1.inOut" },
          "-=0.4"
        )
        .to(
          progressProxy,
          {
            value: 100,
            duration: effectiveDuration,
            ease: "power1.inOut",
            onUpdate: () => setProgress(Math.round(progressProxy.value)),
          },
          "<"
        )
        .to(contentRef.current, { autoAlpha: 1, duration: 0.8 }, "-=0.25")
        .to(
          ".loader__overlay",
          { autoAlpha: 0, duration: 0.6, pointerEvents: "none" },
          "-=0.6"
        )
        .call(() => {
          setProgress(100);
          setShowOverlay(false);
        });
    }, wrapperRef);

    return () => {
      ctx.revert();
    };
  }, [minimumShowTime]);

  return (
    <div ref={wrapperRef} className="relative">
      <div ref={contentRef} className="loader__content relative opacity-0">
        {children}
      </div>

      {showOverlay ? (
        <div
          ref={overlayRef}
          className="loader__overlay fixed inset-0 z-[100] flex items-center justify-center bg-[#050005] text-white"
        >
          <div className="flex flex-col items-center gap-8 text-center">
            <svg
              className="loader__logo h-80 w-80"
              viewBox="0 0 437 395"
              fill="none"
              role="img"
              aria-label={copy?.logoAlt ?? "Leo Jansen logomark"}
            >
              <path
                className="loader__logo-part"
                d="M69 0C73.9706 0 78 4.02944 78 9V306.951C78 311.922 82.0294 315.951 87 315.951H152C156.971 315.951 161 319.981 161 324.951V386C161 390.971 156.971 395 152 395H9C4.02944 395 0 390.971 0 386V9.00001C0 4.02944 4.02944 0 9 0H69Z"
                fill="white"
              />
              <path
                className="loader__logo-part"
                d="M372.62 395C367.65 395 363.62 390.971 363.62 386V88.0488C363.62 83.0782 359.591 79.0488 354.62 79.0488H328C323.029 79.0488 319 75.0194 319 70.0488V9C319 4.02943 323.029 0 328 0H428C432.971 0 437 4.02944 437 9V386C437 390.971 432.971 395 428 395H372.62Z"
                fill="#4D35A5"
              />
              <path
                className="loader__logo-part"
                d="M193.332 247.234C202.169 247.234 209.332 240.071 209.332 231.234V185.109C209.332 176.273 202.169 169.109 193.332 169.109H171.133C162.296 169.109 155.133 176.273 155.133 185.109V231.234C155.133 240.071 162.296 247.234 171.133 247.234H193.332ZM248.883 231.234C248.883 240.071 256.046 247.234 264.883 247.234H284.152C292.989 247.234 300.152 240.071 300.152 231.234V185.109C300.152 176.273 292.989 169.109 284.152 169.109H264.883C256.046 169.109 248.883 176.273 248.883 185.109V231.234ZM135 286.785C126.163 286.785 119 279.622 119 270.785V148C119 139.163 126.163 132 135 132H322.676C331.532 132 338.704 139.194 338.676 148.05L338.289 270.836C338.261 279.652 331.106 286.785 322.289 286.785H135Z"
                fill="#4D35A5"
              />
            </svg>
            <h2 className="loader__greeting text-sm uppercase tracking-[0.45em] text-white/80">
              {copy?.greeting ?? "Welcome"}
            </h2>
            <p className="loader__tagline text-xs uppercase tracking-[0.35em] text-white/60">
              {copy?.message ?? "Preparing the experience"}
            </p>
            <div className="relative h-1 w-52 overflow-hidden rounded-full bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.15)]" aria-hidden="true">
              <span className="loader__progress absolute left-0 top-0 h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#7F0098] via-[#BA00FF] to-[#FF0080]" />
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-full animate-pulse bg-white/20 mix-blend-screen"
              />
            </div>
            <span className="sr-only" role="status" aria-live="polite">
              {copy?.progressLabel ?? "Loading portfolio"}: {Math.round(progress)}%
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InitialLoader;
