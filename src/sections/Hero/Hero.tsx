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
};

type HeroProps = {
  dictionary: HeroDictionary;
};

const Hero = ({ dictionary }: HeroProps) => {
  const [spotsOn, setSpotsOn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const switchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !switchRef.current) {
      return;
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const tween = gsap.to(switchRef.current, {
      autoAlpha: 0.6,
      opacity: 0.6,
      duration: 1.7,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [mounted]);

  return (
    <section id="home" className="relative h-screen w-screen overflow-hidden">
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
          <CanvasComponent spotsOn={spotsOn} />
        </Canvas>
      </div>
      <div>
        {mounted && (
          <Tooltip defaultOpen>
            <TooltipTrigger asChild>
              <div
                ref={switchRef}
                role="switch"
                aria-checked={spotsOn ? "true" : "false"}
                aria-label={dictionary.switchAriaLabel}
                onClick={() => setSpotsOn((value) => !value)}
                className="bg-[#7F0098] absolute bottom-50 right-20 z-10 flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full"
              >
                <Image
                  src="/assets/switch.svg"
                  alt={dictionary.switchAriaLabel}
                  width={40}
                  height={40}
                  className="bottom-50 right-20 z-9 h-9 w-10 select-none"
                />
              </div>
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
