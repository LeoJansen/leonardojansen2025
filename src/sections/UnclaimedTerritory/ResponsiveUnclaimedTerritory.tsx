"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { UnclaimedTerritoryCopy } from "./UnclaimedTerritory";

const DesktopSection = dynamic(() => import("./UnclaimedTerritory"), {
	ssr: false,
	loading: () => <SectionSkeleton />,
});

const MobileSection = dynamic(() => import("./UnclaimedTerritoryMobile"), {
	ssr: false,
	loading: () => <SectionSkeleton />,
});

type ResponsiveUnclaimedTerritoryProps = {
	copy: UnclaimedTerritoryCopy;
};

const ResponsiveUnclaimedTerritory = ({ copy }: ResponsiveUnclaimedTerritoryProps) => {
	const isDesktop = useIsDesktop();

	return (
		<section id="diagnostic" className="relative">
			{isDesktop === null ? (
				<SectionSkeleton />
			) : isDesktop ? (
				<DesktopSection copy={copy} />
			) : (
				<MobileSection copy={copy} />
			)}
		</section>
	);
};

const SectionSkeleton = () => (
	<div className="px-4 py-16 text-white md:px-8 md:py-24 lg:px-12">
		<div className="mx-auto max-w-6xl space-y-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center text-white/40 backdrop-blur-sm">
			<div className="mx-auto h-3 w-32 rounded-full bg-white/10" />
			<div className="mx-auto h-6 w-64 rounded-full bg-white/10" />
			<div className="mx-auto h-4 w-80 rounded-full bg-white/5" />
			<div className="mx-auto h-36 w-full rounded-2xl bg-white/5" />
		</div>
	</div>
);

const useIsDesktop = () => {
	const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 768px)");

		const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
			setIsDesktop(event.matches);
		};

		handleChange(mediaQuery);

		const listener = (event: MediaQueryListEvent) => handleChange(event);

		if (typeof mediaQuery.addEventListener === "function") {
			mediaQuery.addEventListener("change", listener);
			return () => mediaQuery.removeEventListener("change", listener);
		}

		mediaQuery.addListener(listener);
		return () => mediaQuery.removeListener(listener);
	}, []);

	return isDesktop;
};

export default ResponsiveUnclaimedTerritory;
