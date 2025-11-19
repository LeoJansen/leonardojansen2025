import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

type ProjectsPageParams = Promise<{ locale: string }>;

type ProjectsPageProps = {
  params: ProjectsPageParams;
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isLocale(resolvedParams?.locale) ? resolvedParams.locale : defaultLocale;
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.projectsPage.metadata.title,
    description: dictionary.projectsPage.metadata.description,
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams?.locale)) {
    notFound();
  }

  const dictionary = getDictionary(resolvedParams.locale);
  const { projectsPage, clients } = dictionary;
  const { hero, intro, caseStudies, cta } = projectsPage;
  const { projects, viewProject, sourceCode } = clients;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050013] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(92,43,140,0.22),_rgba(5,0,19,0.92)_60%),_linear-gradient(180deg,_rgba(5,0,19,1)_0%,_#050013_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-12">
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

        <section className="mt-12 max-w-3xl border-l-2 border-[#b965ff]/60 pl-6 text-base text-white/70 sm:text-lg">
          <p>{intro}</p>
        </section>

        <section className="mt-16 space-y-6">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#b965ff]">
              {caseStudies.heading}
            </span>
            <p className="max-w-3xl text-base text-white/70 sm:text-lg">{caseStudies.description}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id ?? project.title}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-lg transition hover:border-[#b965ff]/60 hover:bg-white/8"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#050013]/80 via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col gap-6 p-8">
                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                    <p className="text-base text-white/70">{project.description}</p>
                  </div>

                  <ul className="flex flex-wrap gap-2 text-sm text-white/70">
                    {project.technologies?.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-3">
                    {project.link && (
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-transparent bg-[#b965ff] px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#a055f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b965ff]"
                      >
                        {viewProject}
                      </Link>
                    )}
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
                      >
                        {sourceCode}
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#34103b] to-[#5c2b8c] p-10 text-white shadow-2xl">
          <div className="absolute -left-12 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 right-10 h-48 w-48 rounded-full bg-[#b965ff]/20 blur-3xl" />
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
