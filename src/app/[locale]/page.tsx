import { notFound } from "next/navigation";
import App from "../App";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

interface LocalePageProps {
  params: { locale: string };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const dictionary = await getDictionary(resolvedParams.locale);

  return <App locale={resolvedParams.locale} dictionary={dictionary} />;
}
