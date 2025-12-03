import Link from "next/link";
import { Crown, Store, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const cards: Array<{
  title: string;
  description: string;
  Icon: LucideIcon;
  accent: {
    highlight: string;
    ring: string;
    glow: string;
    iconBg: string;
  };
}> = [
  {
    title: "Autoridade & Branding",
    description:
      "Design exclusivo e impactante. Saia da guerra de preços e torne-se a referência do setor.",
    Icon: Crown,
    accent: {
      highlight:
        "from-[#1b012a] via-[#12001f] to-[#050108] after:bg-[radial-gradient(circle_at_top,_rgba(147,51,234,0.25),_transparent_65%)]",
      ring: "ring-1 ring-[#9333EA]/50",
      glow: "hover:shadow-[0_0_45px_rgba(147,51,234,0.45)]",
      iconBg:
        "bg-[linear-gradient(135deg,rgba(147,51,234,0.25),rgba(12,0,24,0.85))] text-[#e0b3ff]",
    },
  },
  {
    title: "Máquinas de Conversão",
    description:
      "Landing Pages com missão única: vender. Estrutura persuasiva que guia até a compra.",
    Icon: Zap,
    accent: {
      highlight:
        "from-[#050108] via-[#0a0614] to-[#031016] after:bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),_transparent_65%)]",
      ring: "ring-1 ring-cyan-400/40",
      glow: "hover:shadow-[0_0_45px_rgba(14,165,233,0.45)]",
      iconBg:
        "bg-[linear-gradient(135deg,rgba(14,165,233,0.25),rgba(5,5,13,0.85))] text-[#9be3ff]",
    },
  },
  {
    title: "Vitrines 24 Horas",
    description:
      "Sua loja aberta 24h. Organização impecável para vender sem depender de vendedor.",
    Icon: Store,
    accent: {
      highlight:
        "from-[#050108] via-[#11060c] to-[#1a0802] after:bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_65%)]",
      ring: "ring-1 ring-orange-400/40",
      glow: "hover:shadow-[0_0_45px_rgba(249,115,22,0.4)]",
      iconBg:
        "bg-[linear-gradient(135deg,rgba(249,115,22,0.3),rgba(20,6,0,0.85))] text-[#ffd2a4]",
    },
  },
];

const SalesMachinesDesktop = () => {
  return (
    <section
      id="sales-machines"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#040104] via-[#080313] to-[#050105] px-6 py-20 text-white sm:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
        <div className="absolute left-1/3 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[#9333EA]/30 blur-[140px]" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[140px]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <header className="space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
            Sales Machines
          </p>
          <div className="space-y-3">
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.9rem]">
              Não crio apenas sites. Crio Máquinas de Vendas.
            </h2>
            <p className="text-base text-white/70 sm:text-lg">
              Escolha a infraestrutura ideal para o momento do seu negócio.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map(({ title, description, Icon, accent }, index) => (
            <article
              key={title}
              className={cn(
                "group relative flex min-h-[320px] flex-col gap-6 overflow-hidden rounded-[30px] border border-white/5 bg-white/5 p-8 text-left backdrop-blur-xl transition-all duration-500",
                accent.glow
              )}
            >
              <div
                aria-hidden
                className={cn(
                  "absolute inset-[1px] rounded-[28px] bg-gradient-to-br opacity-80 transition-opacity duration-500 group-hover:opacity-100",
                  accent.highlight
                )}
              />
              <div className="relative flex items-center justify-between">
                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 text-white transition-all duration-500 group-hover:scale-105",
                    accent.iconBg
                  )}
                >
                  <Icon className="h-8 w-8" strokeWidth={1.4} />
                </div>
                <span className="text-sm font-mono text-white/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="relative space-y-3">
                <h3 className="text-2xl font-semibold text-white">{title}</h3>
                <p className="text-base leading-relaxed text-white/70">{description}</p>
              </div>
              <div className="relative mt-auto flex items-center gap-2 text-sm text-white/60">
                <span className="h-1 w-1 rounded-full bg-[#9333EA]" />
                Impacto imediato na percepção de valor
              </div>
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 rounded-[inherit] ring-offset-2 ring-offset-[#060109] transition duration-500",
                  accent.ring
                )}
              />
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/solutions"
            className="relative inline-flex items-center gap-3 rounded-full border border-[#9333EA]/40 bg-[#15041f] px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-all duration-500 hover:-translate-y-0.5 hover:border-[#9333EA] hover:bg-[#220631]"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-[#9333EA] shadow-[0_0_12px_rgba(147,51,234,0.9)]" />
            Ver Soluções Exclusivas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SalesMachinesDesktop;
