export type ProjectShowcaseCopy = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlightValue: string;
  highlightLabel: string;
  ctaLabel: string;
  ctaHref: string;
};

export type ProjectShowcaseProps = {
  copy: ProjectShowcaseCopy;
};
