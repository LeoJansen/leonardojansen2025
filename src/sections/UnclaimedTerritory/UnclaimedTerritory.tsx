import clsx from "clsx";
import {
	Gem,
	Ghost,
	Instagram,
	MessageCircle,
	type LucideIcon,
} from "lucide-react";
const iconMap = {
	instagram: Instagram,
	ghost: Ghost,
	gem: Gem,
	messageCircle: MessageCircle,
};

type IconKey = keyof typeof iconMap;

const accentStyles = {
	pink: {
		cardGlow:
			"hover:[box-shadow:0_0_35px_rgba(255,126,219,0.45)] hover:border-[rgba(255,126,219,0.55)]",
		overlay:
			"bg-[radial-gradient(circle_at_20%_0%,rgba(255,126,219,0.25),transparent_65%)]",
		iconBg:
			"bg-[linear-gradient(135deg,rgba(255,126,219,0.25),rgba(8,7,11,0.6))]",
		iconHover:
			"group-hover:[box-shadow:0_0_25px_rgba(255,126,219,0.55)]",
		iconColor: "group-hover:text-[#ff7edb]",
	},
	purple: {
		cardGlow:
			"hover:[box-shadow:0_0_35px_rgba(160,107,255,0.45)] hover:border-[rgba(160,107,255,0.55)]",
		overlay:
			"bg-[radial-gradient(circle_at_20%_0%,rgba(160,107,255,0.25),transparent_65%)]",
		iconBg:
			"bg-[linear-gradient(135deg,rgba(160,107,255,0.25),rgba(8,7,11,0.6))]",
		iconHover:
			"group-hover:[box-shadow:0_0_25px_rgba(160,107,255,0.55)]",
		iconColor: "group-hover:text-[#a06bff]",
	},
	cyan: {
		cardGlow:
			"hover:[box-shadow:0_0_35px_rgba(124,231,255,0.45)] hover:border-[rgba(124,231,255,0.55)]",
		overlay:
			"bg-[radial-gradient(circle_at_20%_0%,rgba(124,231,255,0.25),transparent_65%)]",
		iconBg:
			"bg-[linear-gradient(135deg,rgba(124,231,255,0.2),rgba(8,7,11,0.6))]",
		iconHover:
			"group-hover:[box-shadow:0_0_25px_rgba(124,231,255,0.55)]",
		iconColor: "group-hover:text-[#7ce7ff]",
	},
	green: {
		cardGlow:
			"hover:[box-shadow:0_0_35px_rgba(88,245,168,0.45)] hover:border-[rgba(88,245,168,0.55)]",
		overlay:
			"bg-[radial-gradient(circle_at_20%_0%,rgba(88,245,168,0.25),transparent_65%)]",
		iconBg:
			"bg-[linear-gradient(135deg,rgba(88,245,168,0.2),rgba(8,7,11,0.6))]",
		iconHover:
			"group-hover:[box-shadow:0_0_25px_rgba(88,245,168,0.55)]",
		iconColor: "group-hover:text-[#58f5a8]",
	},
} as const;

type AccentKey = keyof typeof accentStyles;

type Block = {
	title: string;
	description: string;
	icon: IconKey;
	accent: AccentKey;
};

type UnclaimedTerritoryCopy = {
	badge: string;
	title: string;
	subtitle: string;
	blocks: Block[];
};

type UnclaimedTerritoryProps = {
	copy: UnclaimedTerritoryCopy;
};

const UnclaimedTerritory = ({ copy }: UnclaimedTerritoryProps) => {
	return (
		<section className="relative isolate px-4 py-16 text-white md:px-8 md:py-24 lg:px-12">
			<div
				className="pointer-events-none absolute inset-0 -z-10 opacity-80"
				aria-hidden
			>
				<div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#5218a8]/40 blur-3xl" />
				<div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#0ea5e9]/30 blur-3xl" />
			</div>

			<div className="mx-auto flex max-w-6xl flex-col gap-10">
				<div className="flex flex-col gap-4 text-center md:text-left">
					<span className="inline-flex items-center self-start rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
						{copy.badge}
					</span>
					<div className="grid gap-4 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] md:items-end">
						<div>
							<h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
								{copy.title}
							</h2>
						</div>
						<p className="text-base text-white/70 sm:text-lg md:text-right">
							{copy.subtitle}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
					{copy.blocks.map((block, index) => {
						const Icon = iconMap[block.icon] as LucideIcon;
						const accent = accentStyles[block.accent] ?? accentStyles.pink;

						return (
							<article
								key={`${block.title}-${index}`}
								className={clsx(
									"group relative flex min-h-[260px] flex-col gap-4 rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1",
									accent.cardGlow,
							)}
							>
								<span
									aria-hidden
									className={clsx(
										"pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
										accent.overlay,
									)}
								/>
								<div className="relative flex items-start justify-between">
									<div
										className={clsx(
											"flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition-all duration-500 group-hover:scale-105",
											accent.iconBg,
											accent.iconHover,
											accent.iconColor,
										)}
									>
										<Icon className="h-6 w-6" strokeWidth={1.6} />
									</div>
									<span className="text-sm font-mono text-white/40">{String(index + 1).padStart(2, "0")}</span>
								</div>
								<div className="relative flex flex-col gap-3">
									<h3 className="text-xl font-semibold text-white">{block.title}</h3>
									<p className="text-sm text-white/70 leading-relaxed">
										{block.description}
									</p>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default UnclaimedTerritory;
export type { UnclaimedTerritoryCopy, Block };
