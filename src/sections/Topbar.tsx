"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import LocaleToggle from "@/components/LocaleToggle";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type NavKey = "home" | "solutions" | "projects" | "about";

const NAV_LINK_PATHS: Record<NavKey, string> = {
    home: "/",
    solutions: "/catalog",
    projects: "/projects",
    about: "/about",
};

const NAV_ORDER: NavKey[] = ["home", "solutions", "projects", "about"];

const FALLBACK_LABELS = {
    en: {
        home: "Home",
        solutions: "Solutions",
        projects: "Projects",
        about: "About",
        cta: "Start Project",
    },
    pt: {
        home: "Início",
        solutions: "Soluções",
        projects: "Projetos",
        about: "Sobre",
        cta: "Iniciar Projeto",
    },
} satisfies Record<Locale, Record<NavKey | "cta", string>>;

type LocaleSwitcherCopy = Pick<Dictionary["navigation"], "localeSwitcher">["localeSwitcher"];

const DEFAULT_SWITCHER: LocaleSwitcherCopy = {
    ariaLabel: "Change language to",
    labels: {
        en: "English",
        pt: "Português",
    },
};

type TopbarProps = {
    locale: Locale;
    localeSwitcher?: LocaleSwitcherCopy;
    navLabels?: Partial<Record<NavKey, string>>;
    ctaLabel?: string;
    ctaHref?: string;
    brand?: string;
};

const Topbar = ({
    locale,
    localeSwitcher,
    navLabels,
    ctaLabel,
    ctaHref,
    brand = "Leo Jansen",
}: TopbarProps) => {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const buildHref = useCallback(
        (path: string) => (path === "/" ? `/${locale}` : `/${locale}${path}`),
        [locale]
    );

    const resolvedNav = useMemo(
        () =>
            NAV_ORDER.map((key) => ({
                key,
                label: navLabels?.[key] ?? FALLBACK_LABELS[locale]?.[key] ?? FALLBACK_LABELS.pt[key],
                href: buildHref(NAV_LINK_PATHS[key]),
            })),
        [buildHref, locale, navLabels]
    );

    const resolvedCtaLabel = ctaLabel ?? FALLBACK_LABELS[locale]?.cta ?? FALLBACK_LABELS.pt.cta;
    const resolvedCtaHref = ctaHref ?? buildHref("/contact");
    const resolvedSwitcher = localeSwitcher ?? DEFAULT_SWITCHER;

    const isLinkActive = (href: string) => {
        if (!pathname) return false;
        if (href === `/${locale}`) {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    useGSAP(
        () => {
            if (!menuRef.current) return;
            gsap.set(menuRef.current, {
                height: 0,
                autoAlpha: 0,
                display: "none",
                pointerEvents: "none",
            });
        },
        { scope: containerRef }
    );

    useGSAP(
        () => {
            const menu = menuRef.current;
            if (!menu) return;

            const linkElements = gsap.utils.toArray<HTMLElement>(
                menu.querySelectorAll("[data-mobile-link]")
            );

            if (isOpen) {
                gsap.set(menu, {
                    display: "flex",
                    pointerEvents: "auto",
                });

                gsap
                    .timeline()
                    .to(menu, {
                        height: "100vh",
                        autoAlpha: 1,
                        duration: 0.4,
                        ease: "power2.out",
                    })
                    .fromTo(
                        linkElements,
                        {
                            y: 24,
                            autoAlpha: 0,
                        },
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: 0.45,
                            stagger: 0.08,
                            ease: "power3.out",
                        },
                        "-=0.15"
                    );
            } else {
                gsap
                    .timeline()
                    .to(linkElements, {
                        y: 12,
                        autoAlpha: 0,
                        duration: 0.2,
                        stagger: 0.05,
                        ease: "power2.in",
                    })
                    .to(
                        menu,
                        {
                            height: 0,
                            autoAlpha: 0,
                            duration: 0.35,
                            ease: "power2.in",
                            onComplete: () => {
                                gsap.set(menu, {
                                    display: "none",
                                    pointerEvents: "none",
                                });
                            },
                        },
                        "<"
                    );
            }
        },
        { scope: containerRef, dependencies: [isOpen] }
    );

    return (
        <header
            ref={containerRef}
            className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md"
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
                <Link href={buildHref("/")} className="text-sm font-semibold uppercase tracking-[0.4em] text-white">
                    {brand}
                </Link>

                <nav className="hidden items-center gap-8 lg:flex">
                    {resolvedNav.map(({ key, label, href }) => (
                        <Link
                            key={key}
                            href={href}
                            className={cn(
                                "text-sm font-medium uppercase tracking-[0.2em] transition-colors",
                                isLinkActive(href)
                                    ? "text-cyan-200"
                                    : "text-slate-400 hover:text-white"
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <LocaleToggle
                        currentLocale={locale}
                        labels={resolvedSwitcher.labels}
                        ariaLabel={resolvedSwitcher.ariaLabel}
                    />
                    <Button
                        asChild
                        className="rounded-full border border-cyan-400/40 bg-cyan-400/20 px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100 shadow-[0_0_25px_rgba(34,211,238,0.25)] transition hover:bg-cyan-300/30 hover:text-white"
                    >
                        <Link href={resolvedCtaHref}>{resolvedCtaLabel}</Link>
                    </Button>
                </div>

                <button
                    type="button"
                    className="flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/5 lg:hidden"
                    aria-label="Abrir menu de navegação"
                    aria-expanded={isOpen ? "true" : "false"}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    <span className="relative block h-4 w-6">
                        <span
                            className={cn(
                                "absolute left-0 h-0.5 w-full bg-white transition-all",
                                isOpen ? "top-1/2 rotate-45" : "top-0"
                            )}
                        />
                        <span
                            className={cn(
                                "absolute left-0 h-0.5 w-full bg-white transition-all",
                                isOpen ? "opacity-0" : "top-1/2 -translate-y-1/2"
                            )}
                        />
                        <span
                            className={cn(
                                "absolute left-0 h-0.5 w-full bg-white transition-all",
                                isOpen ? "bottom-1/2 -rotate-45" : "bottom-0"
                            )}
                        />
                    </span>
                </button>
            </div>

            <div
                ref={menuRef}
                className="fixed inset-0 z-50 flex h-0 flex-col items-center justify-center gap-10 bg-black px-6 text-center"
            >
                <div className="flex flex-col items-center gap-6 text-2xl font-semibold uppercase tracking-[0.3em]">
                    {resolvedNav.map(({ key, label, href }) => (
                        <Link
                            key={`mobile-${key}`}
                            href={href}
                            data-mobile-link
                            className="text-white/80 transition hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                <Button
                    asChild
                    size="lg"
                    data-mobile-link
                    className="w-full max-w-xs rounded-full border border-cyan-300/60 bg-cyan-400/20 px-8 py-6 text-base font-semibold uppercase tracking-[0.3em] text-cyan-100 shadow-[0_0_35px_rgba(34,211,238,0.35)]"
                >
                    <Link href={resolvedCtaHref} onClick={() => setIsOpen(false)}>
                        {resolvedCtaLabel}
                    </Link>
                </Button>

                <div data-mobile-link className="text-sm">
                    <LocaleToggle
                        currentLocale={locale}
                        labels={resolvedSwitcher.labels}
                        ariaLabel={resolvedSwitcher.ariaLabel}
                    />
                </div>
            </div>
        </header>
    );
};

export default Topbar;
