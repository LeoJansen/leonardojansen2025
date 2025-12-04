import Link from "next/link";
import { Crown, Store, Zap, type LucideIcon } from "lucide-react";
import type { SalesMachinesCardId, SalesMachinesCopy } from "./types";

const cardVisuals: Record<
  SalesMachinesCardId,
  {
    Icon: LucideIcon;
    accent: string;
  }
> = {
  authority: {
    Icon: Crown,
    accent:
      "from-[#1b012a] via-[#12001f] to-[#050108] border-[#9333EA]/40 shadow-[0_15px_45px_rgba(147,51,234,0.35)]",
  },
  conversion: {
    Icon: Zap,
    accent:
      "from-[#030910] via-[#05131c] to-[#031820] border-cyan-400/40 shadow-[0_15px_45px_rgba(14,165,233,0.35)]",
  },
  showcase: {
    Icon: Store,
    accent:
      "from-[#1e0600] via-[#170501] to-[#0c0200] border-orange-400/40 shadow-[0_15px_45px_rgba(249,115,22,0.35)]",
  },
};

type SalesMachinesMobileProps = {
  copy: SalesMachinesCopy;
};

const SalesMachinesMobile = ({ copy }: SalesMachinesMobileProps) => {
  return (
    <section
      id="sales-machines"
      className="relative isolate overflow-hidden  px-5 py-16 text-white"
    >
    

      <div className="mx-auto flex max-w-xl flex-col gap-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
            {copy.eyebrow}
          </p>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold leading-snug">
              {copy.title}
            </h2>
            <p className="text-sm text-white/70">
              {copy.subtitle}
            </p>
          </div>
        </header>

        <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6">
          {copy.cards.map((card) => {
            const cardId = card.id as SalesMachinesCardId;
            const visuals = cardVisuals[cardId];
            if (!visuals) return null;
            const { Icon, accent } = visuals;

            return (
              <article
                key={card.id}
                className={`relative min-w-[85%] snap-center rounded-[26px] border bg-gradient-to-br p-6 text-left backdrop-blur-xl ${accent}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
                    <Icon className="h-7 w-7" strokeWidth={1.4} />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50">
                    {copy.cardTag}
                  </span>
                </div>
                <div className="mt-5 space-y-3">
                  <h3 className="text-2xl font-semibold">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{card.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <Link
          href={copy.ctaHref}
          className="inline-flex items-center justify-center rounded-full border border-[#9333EA]/50 bg-[#1a0424] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-[0_10px_35px_rgba(147,51,234,0.35)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          {copy.ctaLabel}
        </Link>
      </div>
    </section>
  );
};

export default SalesMachinesMobile;
