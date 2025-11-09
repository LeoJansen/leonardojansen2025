"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const BASE_CONTAINER_CLASS = "pointer-events-none absolute right-1/2 top-0  transform-gpu";
const BASE_LAYER_CLASS =
	"absolute aspect-square rounded-full mix-blend-screen blur-[120px] saturate-[1.3]";

const LAYER_PROFILES = [
	{
		sizeClass: "w-[520px]",
		gradient:
			"bg-[radial-gradient(circle_at_center,_rgba(190,109,255,0.42)_0%,_rgba(120,60,199,0.2)_40%,_rgba(40,0,88,0)_65%)]",
		shadow: "shadow-[0_0_180px_60px_rgba(130,55,200,0.18)]",
	},
	{
		sizeClass: "w-[620px]",
		gradient:
			"bg-[radial-gradient(circle_at_center,_rgba(220,185,255,0.42)_0%,_rgba(90,40,160,0.18)_45%,_rgba(20,0,70,0)_68%)]",
		shadow: "shadow-[0_0_220px_70px_rgba(180,120,255,0.16)]",
	},
	{
		sizeClass: "w-[540px]",
		gradient:
			"bg-[radial-gradient(circle_at_center,_rgba(160,85,255,0.4)_0%,_rgba(73,28,150,0.22)_46%,_rgba(26,0,69,0)_70%)]",
		shadow: "shadow-[0_0_200px_60px_rgba(110,40,210,0.2)]",
	},
	{
		sizeClass: "w-[700px]",
		gradient:
			"bg-[radial-gradient(circle_at_center,_rgba(205,160,255,0.35)_0%,_rgba(84,32,168,0.16)_45%,_rgba(14,0,48,0)_72%)]",
		shadow: "shadow-[0_0_260px_80px_rgba(150,90,240,0.14)]",
	},
	{
		sizeClass: "w-[460px]",
		gradient:
			"bg-[radial-gradient(circle_at_center,_rgba(171,104,255,0.48)_0%,_rgba(118,56,215,0.18)_42%,_rgba(61,15,146,0)_66%)]",
		shadow: "shadow-[0_0_160px_55px_rgba(130,55,215,0.2)]",
	},
];

export type SkySmokeProps = {
	className?: string;
	layerCount?: number;
};

const SkySmoke = ({ className, layerCount = 5 }: SkySmokeProps) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
	const layers = useMemo(() => Array.from({ length: layerCount }), [layerCount]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}

		layerRefs.current.length = layerCount;

		const ctx = gsap.context(() => {
			gsap.set(container, { transformOrigin: "50% 50%" });

			gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } })
				.to(container, { xPercent: 4, yPercent: -3, duration: 18 })
				.to(container, { xPercent: -5, yPercent: 4, duration: 21 })
				.to(container, { xPercent: 2, yPercent: -6, duration: 16 });

			gsap.to(container, {
				rotation: 2.2,
				duration: 26,
				ease: "sine.inOut",
				repeat: -1,
				yoyo: true,
			});

			layerRefs.current.slice(0, layerCount).forEach((layer, index) => {
				if (!layer) {
					return;
				}

				const startScaleX = gsap.utils.random(1.15, 1.65);
				const startScaleY = gsap.utils.random(0.68, 0.95);
				const startOpacity = gsap.utils.random(0.18, 0.35);
				const startX = gsap.utils.random(-26, 26);
				const startY = gsap.utils.random(-22, 22);
				const depthDelay = index * 0.35;

				gsap.set(layer, {
					xPercent: startX,
					yPercent: startY,
					scaleX: startScaleX,
					scaleY: startScaleY,
					opacity: startOpacity,
					rotate: gsap.utils.random(-10, 10),
				});

				const swirlTimeline = gsap.timeline({
					delay: depthDelay,
					repeat: -1,
					yoyo: true,
					defaults: { ease: "sine.inOut" },
				});

				swirlTimeline
					.to(layer, {
						xPercent: startX + gsap.utils.random(-28, 28),
						yPercent: startY + gsap.utils.random(-24, 24),
						scaleX: startScaleX * gsap.utils.random(1.08, 1.18),
						scaleY: startScaleY * gsap.utils.random(1.05, 1.15),
						rotate: `+=${gsap.utils.random(-14, 14)}`,
						opacity: startOpacity * gsap.utils.random(1.2, 1.6),
						duration: gsap.utils.random(8, 13),
					})
					.to(layer, {
						xPercent: startX + gsap.utils.random(-40, 40),
						yPercent: startY + gsap.utils.random(-32, 32),
						scaleX: startScaleX * gsap.utils.random(1.18, 1.34),
						scaleY: startScaleY * gsap.utils.random(1.08, 1.24),
						rotate: `+=${gsap.utils.random(-20, 20)}`,
						opacity: startOpacity * gsap.utils.random(1.4, 1.9),
						duration: gsap.utils.random(10, 16),
					})
					.to(layer, {
						xPercent: startX + gsap.utils.random(-18, 18),
						yPercent: startY + gsap.utils.random(-20, 20),
						scaleX: startScaleX * gsap.utils.random(0.94, 1.08),
						scaleY: startScaleY * gsap.utils.random(0.9, 1.04),
						rotate: `+=${gsap.utils.random(-12, 12)}`,
						opacity: startOpacity * gsap.utils.random(0.9, 1.25),
						duration: gsap.utils.random(7, 12),
					});
			});
		}, container);

		return () => {
			ctx.revert();
		};
	}, [layerCount]);

	return (
		<div ref={containerRef} className={cn(BASE_CONTAINER_CLASS, className)}>
			{layers.map((_, index) => {
				const profile = LAYER_PROFILES[index % LAYER_PROFILES.length];
				return (
				<div
					key={index}
					ref={(el) => {
						layerRefs.current[index] = el;
					}}
					className={cn(
						BASE_LAYER_CLASS,
						profile.sizeClass,
						profile.gradient,
						profile.shadow,
						index % 2 === 0 ? "opacity-70" : "opacity-55"
					)}
				/>
			);
			})}
		</div>
	);
};

export default SkySmoke;
