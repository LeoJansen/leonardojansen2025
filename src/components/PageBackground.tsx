import type { ReactNode } from "react";

import ParticleField from "@/components/ParticleField";
import SkySmoke from "@/components/skySmoke";
import { cn } from "@/lib/utils";

interface PageBackgroundProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

const PageBackground = ({ children, className, contentClassName }: PageBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-[#000000]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <SkySmoke className="absolute inset-0 z-0 opacity-80" />
        <ParticleField
          count={22}
          className="absolute inset-0 !z-10 opacity-70"
          particleClassName="h-[4px] w-[4px] rounded-full bg-[#f5e6ff] shadow-[0_0_18px_rgba(245,230,255,0.85)]"
          starfieldClassName="opacity-50"
        />
      </div>
      <div className={cn("relative z-20 flex min-h-screen flex-col", contentClassName)}>
        {children}
      </div>
    </div>
  );
};

export default PageBackground;
