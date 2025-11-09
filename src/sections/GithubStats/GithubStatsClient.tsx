'use client';

import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import type { Locale } from '@/i18n/config';
import type { GithubStatsData, GithubStatsDictionary } from './GithubStats';
import ParticleField from '@/components/ParticleField';
import SkySmoke from '@/components/skySmoke';

interface GithubStatsClientProps {
  stats: GithubStatsData;
  dictionary: GithubStatsDictionary;
  locale: Locale;
}

const accentGradients = [
  'from-[#1A0B2E]/80 via-[#0B0416]/70 to-[#03010B]/90',
  'from-[#1D063F]/80 via-[#120424]/80 to-[#04010D]/90',
  'from-[#13082E]/80 via-[#070218]/80 to-[#020008]/90',
];

const localeMapping: Record<Locale, string> = {
  en: 'en-US',
  pt: 'pt-BR',
};

const GithubStatsClient = ({ stats, dictionary, locale }: GithubStatsClientProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const formatter = useMemo(
    () => new Intl.NumberFormat(localeMapping[locale] ?? 'en-US', { maximumFractionDigits: 0 }),
    [locale]
  );

  const cards = useMemo(
    () => [
      { id: 'repos', label: dictionary.repos, value: stats.publicRepos },
      { id: 'activity', label: dictionary.activity, value: stats.recentActivity },
      { id: 'commits', label: dictionary.commits, value: stats.totalCommits },
      { id: 'years', label: dictionary.yearsOnGithub, value: stats.yearsOnGithub },
      { id: 'daysGithub', label: dictionary.daysOnGithub, value: stats.daysOnGithub },
      { id: 'codingDays', label: dictionary.codingDays, value: stats.codingDays },
      { id: 'loc', label: dictionary.linesOfCode, value: stats.linesOfCode },
      { id: 'files', label: dictionary.filesCreated, value: stats.filesCreated },
      { id: 'apps', label: dictionary.appsCreated, value: stats.appsCreated },
    ],
    [dictionary, stats]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) {
        return;
      }

      const cardsElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const heading = container.querySelector<HTMLElement>('[data-heading]');
      const glow = container.querySelector<HTMLElement>('[data-glow]');

      if (glow) {
        gsap.fromTo(
          glow,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
        );
      }

      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 }
        );
      }

      if (cardsElements.length) {
        gsap.fromTo(
          cardsElements,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.08, delay: 0.2 }
        );

        cardsElements.forEach((card) => {
          const valueEl = card.querySelector<HTMLElement>('[data-stat-value]');
          if (!valueEl) {
            return;
          }
          const target = Number(valueEl.dataset.target ?? 0);
          const counter = { current: 0 };

          gsap.fromTo(
            counter,
            { current: 0 },
            {
              current: target,
              duration: 1.2,
              delay: 0.25,
              ease: 'power2.out',
              onUpdate: () => {
                valueEl.textContent = formatter.format(Math.round(counter.current));
              },
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [cards, formatter]);

  return (
    <section
      ref={containerRef}
      id="github-stats"
      className="relative py-24 "
    >
      <SkySmoke className="opacity-90 z-30" />
     
      <ParticleField showStarfield={false}  particleClassName="h-[4px] w-[4px] bg-[#f3e6ff]" />
      <div
        data-glow
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.35),_rgba(10,10,10,0))] blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-[28px] border border-[#9333EA]/35 bg-[#04010C]/90 backdrop-blur-xl shadow-[0_0_45px_rgba(147,51,234,0.35)]">
          <div className="absolute -inset-px rounded-[30px] bg-[linear-gradient(135deg,rgba(147,51,234,0.35),rgba(10,10,10,0)_45%,rgba(168,85,247,0.2))] opacity-70" />

          <div className="relative z-10 flex flex-col gap-10 px-6 py-10 md:px-12">
            <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between" data-heading>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#A855F7]/80">V2.0</p>
                <h3 className="text-3xl font-semibold text-white md:text-4xl">
                  <span className="bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">
                    {dictionary.title}
                  </span>
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 shadow-[0_10px_30px_rgba(147,51,234,0.25)]">
                <span className="h-2 w-2 rounded-full bg-[#A855F7] shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
                <span>GitHub Insights</span>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card, index) => {
                const gradient = accentGradients[index % accentGradients.length];
                return (
                  <div
                    key={card.id}
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${gradient} p-[1px] shadow-[0_18px_45px_rgba(15,7,45,0.45)] transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_25px_65px_rgba(147,51,234,0.45)]`}
                  >
                    <div className="relative flex h-full flex-col gap-3 rounded-[21px] bg-[#050014]/80 p-5">
                      <div className="absolute -top-16 right-0 h-28 w-28 rounded-full bg-gradient-to-br from-[#9333EA]/60 via-transparent to-transparent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                        {card.label}
                      </span>
                      <span
                        data-stat-value
                        data-target={card.value}
                        className="font-mono text-4xl font-bold text-white drop-shadow-[0_6px_24px_rgba(147,51,234,0.35)]"
                      >
                        {formatter.format(card.value)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubStatsClient;
