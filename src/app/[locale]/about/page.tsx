import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

type AboutPageParams = Promise<{ locale: string }>;

type AboutPageProps = {
  params: AboutPageParams;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isLocale(resolvedParams?.locale) ? resolvedParams.locale : defaultLocale;
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.aboutPage.metadata.title,
    description: dictionary.aboutPage.metadata.description,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams?.locale)) {
    notFound();
  }

  const dictionary = getDictionary(resolvedParams.locale);
  const { aboutPage } = dictionary;
  const { hero, bio, highlights, values, timelineHeading, timeline, cta } = aboutPage;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040016] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(185,101,255,0.18),_rgba(4,0,22,0.9)_60%),_linear-gradient(180deg,_rgba(4,0,22,1)_0%,_#040016_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-12">
        <header className="max-w-4xl space-y-6">
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

        <section className="mt-16 grid gap-6 sm:grid-cols-3">
          {highlights.map((highlight) => (
            <div
              key={highlight.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-lg"
            >
              <p className="text-4xl font-semibold text-white">{highlight.value}</p>
              <p className="mt-3 text-sm text-white/70">{highlight.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-3">
          {bio.map((section) => (
            <article
              key={section.title}
              className="flex h-full flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg"
            >
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              <p className="text-base leading-relaxed text-white/70">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#34103b] to-[#5c2b8c] p-8">
            <h2 className="text-2xl font-semibold">{values.heading}</h2>
            <ul className="space-y-4 text-base text-white/80">
              {values.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-white/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
            <h2 className="text-2xl font-semibold text-white">{timelineHeading}</h2>
            <ol className="space-y-6 border-l-2 border-[#b965ff]/60 pl-6">
              {timeline.map((entry) => (
                <li key={entry.title} className="space-y-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b965ff]">
                    {entry.period}
                  </span>
                  <h3 className="text-xl font-semibold text-white">{entry.title}</h3>
                  <p className="text-base text-white/70">{entry.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mt-20 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#5c2b8c] to-[#34103b] p-10 text-white shadow-2xl">
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
