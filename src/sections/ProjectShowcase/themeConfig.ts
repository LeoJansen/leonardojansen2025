import type { ProjectShowcaseTheme } from "./types";

export type ProjectThemeTokens = {
  accentText: string;
  badgeClass: string;
  borderClass: string;
  tagClass: string;
  glowShadow: string;
  borderGlow: string;
  mockupGradient: string;
};

export const PROJECT_THEME_MAP: Record<ProjectShowcaseTheme, ProjectThemeTokens> = {
  amber: {
    accentText: "text-amber-300",
    badgeClass: "border border-amber-500/30 bg-amber-500/10 text-amber-100",
    borderClass: "border-amber-500/20",
    tagClass: "border border-amber-500/30 bg-amber-500/5 text-amber-100",
    glowShadow: "0 30px 80px rgba(245,158,11,0.25)",
    borderGlow: "rgba(245,158,11,0.6)",
    mockupGradient: "from-amber-400/20 via-[#0b0b17] to-black",
  },
  teal: {
    accentText: "text-cyan-300",
    badgeClass: "border border-cyan-400/30 bg-cyan-500/10 text-cyan-100",
    borderClass: "border-cyan-400/20",
    tagClass: "border border-cyan-400/30 bg-cyan-500/5 text-cyan-100",
    glowShadow: "0 30px 80px rgba(34,211,238,0.22)",
    borderGlow: "rgba(34,211,238,0.6)",
    mockupGradient: "from-cyan-400/20 via-[#0a1420] to-black",
  },
};
