import Link from "next/link";
import { Crown, Store, Zap, type LucideIcon } from "lucide-react";

type Card = {
  title: string;
  description: string;
  Icon: LucideIcon;
  accent: string;
};

const cards: Card[] = [
  {
    title: "Autoridade & Branding",
    description:
      "Design exclusivo e impactante. Saia da guerra de preços e torne-se a referência do setor.",
    Icon: Crown,
    accent:
      "from-[#1b012a] via-[#12001f] to-[#050108] border-[#9333EA]/40 shadow-[0_15px_45px_rgba(147,51,234,0.35)]",
  },
  {
    title: "Máquinas de Conversão",
    description:
      "Landing Pages com missão única: vender. Estrutura persuasiva que guia até a compra.",
    Icon: Zap,
    accent:
      "from-[#030910] via-[#05131c] to-[#031820] border-cyan-400/40 shadow-[0_15px_45px_rgba(14,165,233,0.35)]",
  },
  {
    title: "Vitrines 24 Horas",
    description:
      "Sua loja aberta 24h. Organização impecável para vender sem depender de vendedor.",
    Icon: Store,
    accent:
      "from-[#1e0600] via-[#170501] to-[#0c0200] border-orange-400/40 shadow-[0_15px_45px_rgba(249,115,22,0.35)]",
  },
];

const SalesMachinesMobile = () => {
  return (
    <section
      id="sales-machines"
      className="relative isolate overflow-hidden  px-5 py-16 text-white"
    >
    

      <div className="mx-auto flex max-w-xl flex-col gap-10">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
            Sales Machines
          </p>
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold leading-snug">
              Não crio apenas sites. Crio Máquinas de Vendas.
            </h2>
            <p className="text-sm text-white/70">
              Escolha a infraestrutura ideal para o momento do seu negócio.
            </p>
          </div>
        </header>

        <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6">
          {cards.map(({ title, description, Icon, accent }) => (
            <article
              key={title}
              className={`relative min-w-[85%] snap-center rounded-[26px] border bg-gradient-to-br p-6 text-left backdrop-blur-xl ${accent}`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.4} />
                </div>
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50">
                  Sales
                </span>
              </div>
              <div className="mt-5 space-y-3">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{description}</p>
              </div>
            </article>
          ))}
        </div>

        <Link
          href="/solutions"
          className="inline-flex items-center justify-center rounded-full border border-[#9333EA]/50 bg-[#1a0424] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white shadow-[0_10px_35px_rgba(147,51,234,0.35)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          Ver Soluções Exclusivas
        </Link>
      </div>
    </section>
  );
};

export default SalesMachinesMobile;
