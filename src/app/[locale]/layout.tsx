import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import Topbar from "@/sections/Topbar";

type LayoutParams = {
  locale: string;
};

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<LayoutParams>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function buildAlternateLanguages() {
  return Object.fromEntries(locales.map((locale) => [locale, `/${locale}`]));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    alternates: {
      canonical: `/${locale}`,
  languages: buildAlternateLanguages(),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const localeSwitcher = dictionary.navigation?.localeSwitcher;

  return (
    <>
      <Topbar locale={locale} localeSwitcher={localeSwitcher} />
      {children}
    </>
  );
}
