export type ProjectShowcaseTheme = "amber" | "teal";

export type ProjectShowcaseProject = {
  id: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  icon: "hardHat" | "brain" | "heartHandshake";
  theme: ProjectShowcaseTheme;
  ctaLabel: string;
  ctaHref: string;
};

export type ProjectShowcaseCopy = {
  badge: string;
  title: string;
  subtitle: string;
  projects: ProjectShowcaseProject[];
};

export type ProjectShowcaseProps = {
  copy: ProjectShowcaseCopy;
};
