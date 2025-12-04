export type SalesMachinesCardId = "authority" | "conversion" | "showcase";

export type SalesMachinesCardCopy = {
  id: SalesMachinesCardId;
  title: string;
  description: string;
};

export type SalesMachinesCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cardTag: string;
  footnote: string;
  ctaLabel: string;
  ctaHref: string;
  cards: SalesMachinesCardCopy[];
};

export type SalesMachinesProps = {
  copy: SalesMachinesCopy;
};
