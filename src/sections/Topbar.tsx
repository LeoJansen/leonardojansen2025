"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import LocaleToggle from "@/components/LocaleToggle";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { cn } from "@/lib/utils";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

type NavKey = "home" | "solutions" | "projects" | "about";

const NAV_LINK_PATHS: Record<NavKey, string> = {
    home: "/",
    solutions: "/solutions",
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
    brand = "LEO.DEV",
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

    const [brandPrimary, brandAccent] = useMemo(() => {
        const parts = brand.split(".");
        if (parts.length >= 2) {
            return [parts[0], `.${parts.slice(1).join(".")}`];
        }
        return ["LEO", ".DEV"];
    }, [brand]);

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
                yPercent: -100,
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
                        yPercent: 0,
                        autoAlpha: 1,
                        duration: 0.45,
                        ease: "power3.out",
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
                            duration: 0.35,
                            stagger: 0.08,
                            ease: "power3.out",
                        },
                        "-=0.2"
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
                            yPercent: -100,
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
            className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#030005]/80 backdrop-blur-md"
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
                <Link
                    href={buildHref("/")}
                    className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.5em]"
                >
                    <Image src="/assets/logo-horizontal-black-bg.svg" 
                    alt="Logo"
                     width={1570}
                      height={417}
                      className="w-40"
                      />
                </Link>

                <nav className="hidden items-center gap-8 lg:flex">
                    {resolvedNav.map(({ key, label, href }) => {
                        const active = isLinkActive(href);
                        return (
                            <Link
                                key={key}
                                href={href}
                                className={cn(
                                    "text-sm font-semibold uppercase tracking-[0.3em] transition-colors",
                                    active
                                        ? "text-white drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]"
                                        : "text-gray-400 hover:text-white"
                                )}
                            >
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden items-center gap-5 lg:flex">
                    <LocaleToggle
                        currentLocale={locale}
                        labels={resolvedSwitcher.labels}
                        ariaLabel={resolvedSwitcher.ariaLabel}
                    />
                    <Button
                        asChild
                        className="rounded-full bg-[#7c3aed] px-6 py-2 text-sm font-bold uppercase tracking-[0.3em] text-white shadow-[0_0_16px_rgba(124,58,237,0.35)] transition duration-300 hover:bg-[#6d28d9] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                    >
                        <Link href={resolvedCtaHref}>{resolvedCtaLabel}</Link>
                    </Button>
                </div>

                <button
                    type="button"
                    className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/30 lg:hidden"
                    aria-label="Abrir menu de navegação"
                    aria-expanded={isOpen ? "true" : "false"}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                </button>
            </div>

            <div
                ref={menuRef}
                className="fixed inset-0 z-40 hidden flex-col items-center justify-center gap-10 bg-[#030005] px-6 text-center"
            >
                <div className="flex flex-col items-center gap-6 text-2xl font-semibold uppercase tracking-[0.4em]">
                    {resolvedNav.map(({ key, label, href }) => (
                        <Link
                            key={`mobile-${key}`}
                            href={href}
                            data-mobile-link
                            className="text-gray-200 transition hover:text-white"
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
                    className="w-full max-w-xs rounded-full bg-[#7c3aed] px-8 py-6 text-base font-bold uppercase tracking-[0.4em] text-white shadow-[0_0_16px_rgba(124,58,237,0.35)] transition hover:bg-[#6d28d9] hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                >
                    <Link href={resolvedCtaHref} onClick={() => setIsOpen(false)}>
                        {resolvedCtaLabel}
                    </Link>
                </Button>

                <div data-mobile-link className="text-sm text-gray-300">
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
