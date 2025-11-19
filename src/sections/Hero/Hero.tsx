"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CanvasComponent } from "./comp/CanvasComponent";

type HeroDictionary = {
  logoAlt: string;
  switchTooltip: string;
  switchAriaLabel: string;
  lightMessage?: string;
};

type HeroProps = {
  dictionary: HeroDictionary;
};

const Hero = ({ dictionary }: HeroProps) => {
  const [spotsOn, setSpotsOn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const switchBgRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !switchBgRef.current) {
      return;
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const tween = gsap.fromTo(
      switchBgRef.current,
      { opacity: 1 },
      {
        opacity: 0.15,
        duration: 1.7,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      }
    );

    return () => {
      tween.kill();
    };
  }, [mounted]);

  return (
    <section id="home" className="relative h-screen w-screen overflow-hidden z-40">
      <div className="c-space absolute left-10 right-0 top-10 z-10 w-full text-center">
        <Image
          src="/assets/leoLogoIcon.svg"
          alt={dictionary.logoAlt}
          width={437}
          height={395}
          className="h-10 w-10 filter brightness-[0.678]"
          priority
        />
        
      </div>
      <div className="absolute inset-0">
        <Canvas
          shadows
          className="!h-full !w-full"
          gl={{ alpha: false }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 3, 14], fov: 15 }}
        >
          <CanvasComponent spotsOn={spotsOn} lightMessage={dictionary.lightMessage} />
        </Canvas>
      </div>
      <div>
        {mounted && (
          <Tooltip defaultOpen>
            <TooltipTrigger asChild>
              <label
                className="absolute bottom-50 right-20 z-10 flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full bg-[#34103b] overflow-hidden"
              >
                <span
                  ref={switchBgRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full bg-[#b965ff] opacity-100"
                />
                <span className="sr-only">{dictionary.switchAriaLabel}</span>
                <input
                  type="checkbox"
                  aria-label={dictionary.switchAriaLabel}
                  checked={spotsOn}
                  onChange={(event) => setSpotsOn(event.target.checked)}
                  className="sr-only"
                />
                <Image
                  src="/assets/switch.svg"
                  alt={dictionary.switchAriaLabel}
                  width={40}
                  height={40}
                  className="relative z-[1] h-9 w-10 select-none"
                />
              </label>
            </TooltipTrigger>
            <TooltipContent>
              <p>{dictionary.switchTooltip}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </section>
  );
};

export default Hero;
