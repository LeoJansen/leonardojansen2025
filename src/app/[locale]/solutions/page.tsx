import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

type SolutionsPageParams = Promise<{ locale: string }>;

type SolutionsPageProps = {
  params: SolutionsPageParams;
};

export async function generateMetadata({ params }: SolutionsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isLocale(resolvedParams?.locale) ? resolvedParams.locale : defaultLocale;
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.solutions.metadata.title,
    description: dictionary.solutions.metadata.description,
  };
}

export default async function SolutionsPage({ params }: SolutionsPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams?.locale)) {
    notFound();
  }

  const dictionary = getDictionary(resolvedParams.locale);
  const { hero, pillars, cta } = dictionary.solutions;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050013] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(185,101,255,0.18),_rgba(5,0,19,0.75)_55%),_linear-gradient(180deg,_rgba(5,0,19,1)_0%,_#050013_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-24 sm:px-10 lg:px-12">
        <header className="max-w-3xl space-y-6">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-medium uppercase tracking-[0.2em] text-white/70">
            {hero.eyebrow}
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
            {hero.subtitle}
          </p>
        </header>

        <section className="grid gap-10 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg"
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-[#b965ff]">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-white">{pillar.title}</h2>
                <p className="text-base leading-relaxed text-white/70">{pillar.description}</p>
              </div>
              <ul className="mt-2 space-y-3 text-sm text-white/70">
                {pillar.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#b965ff]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#5c2b8c] to-[#34103b] p-10 text-white shadow-2xl">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-semibold sm:text-4xl">{cta.title}</h2>
            <p className="max-w-2xl text-lg text-white/80">{cta.description}</p>
            <Link
              href={cta.buttonHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#34103b] transition hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
            >
              {cta.buttonLabel}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
