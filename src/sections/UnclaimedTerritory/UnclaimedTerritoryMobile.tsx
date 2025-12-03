import clsx from "clsx";
import {
	Gem,
	Ghost,
	Instagram,
	MessageCircle,
	type LucideIcon,
} from "lucide-react";
import type { Block, UnclaimedTerritoryCopy } from "./UnclaimedTerritory";

const iconMap = {
	instagram: Instagram,
	ghost: Ghost,
	gem: Gem,
	messageCircle: MessageCircle,
} satisfies Record<Block["icon"], LucideIcon>;

const accentTokens = {
	pink: {
		bar: "before:bg-[#ff7edb]/70",
		iconColor: "text-[#ff7edb]",
		iconGlow: "shadow-[0_0_20px_rgba(255,126,219,0.45)]",
	},
	purple: {
		bar: "before:bg-[#a06bff]/70",
		iconColor: "text-[#a06bff]",
		iconGlow: "shadow-[0_0_20px_rgba(160,107,255,0.45)]",
	},
	cyan: {
		bar: "before:bg-[#7ce7ff]/70",
		iconColor: "text-[#7ce7ff]",
		iconGlow: "shadow-[0_0_20px_rgba(124,231,255,0.45)]",
	},
	green: {
		bar: "before:bg-[#58f5a8]/70",
		iconColor: "text-[#58f5a8]",
		iconGlow: "shadow-[0_0_20px_rgba(88,245,168,0.45)]",
	},
} as const satisfies Record<Block["accent"], Record<string, string>>;

type UnclaimedTerritoryMobileProps = {
	copy: UnclaimedTerritoryCopy;
};

const UnclaimedTerritoryMobile = ({ copy }: UnclaimedTerritoryMobileProps) => {
	return (
		<section className="relative block px-4 py-14 text-white md:hidden">
			<div
				className="pointer-events-none absolute inset-0 -z-10 opacity-80"
				aria-hidden
			>
				<div className="absolute left-10 top-0 h-40 w-40 rounded-full bg-[#a855f7]/30 blur-3xl" />
				<div className="absolute bottom-10 right-2 h-48 w-48 rounded-full bg-[#0ea5e9]/30 blur-3xl" />
			</div>
			<div className="mx-auto flex max-w-2xl flex-col gap-6 text-center">
				<span className="mx-auto inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[11px] uppercase tracking-[0.25em] text-white/70">
					{copy.badge}
				</span>
				<div className="space-y-3">
					<h2 className="text-3xl font-semibold text-white">{copy.title}</h2>
					<p className="text-base text-white/70">{copy.subtitle}</p>
				</div>
			</div>
			<div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4">
				{copy.blocks.map((block, index) => {
					const Icon = iconMap[block.icon];
					const accent = accentTokens[block.accent];

					return (
						<article
							key={`${block.title}-${index}`}
							className={clsx(
								"relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] px-5 py-6 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.4)]",
								"before:absolute before:left-3 before:top-4 before:bottom-4 before:w-[3px] before:rounded-full before:bg-white/20 before:content-['']",
								accent.bar,
							)}
						>
							<div className="flex items-center gap-4">
								<div
									className={clsx(
										"flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]",
										accent.iconColor,
										accent.iconGlow,
									)}
								>
									<Icon className="h-5 w-5" strokeWidth={1.6} />
								</div>
								<div className="flex flex-col text-left">
									<span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/50">
										{`0${index + 1}`}
									</span>
									<h3 className="text-lg font-semibold text-white">{block.title}</h3>
								</div>
							</div>
							<p className="mt-4 text-sm leading-relaxed text-white/80">
								{block.description}
							</p>
						</article>
					);
				})}
			</div>
		</section>
	);
};

export default UnclaimedTerritoryMobile;
