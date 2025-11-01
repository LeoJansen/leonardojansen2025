import { notFound } from "next/navigation";
import App from "../App";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

interface LocalePageProps {
  params: { locale: string };
}

export default function LocalePage({ params }: LocalePageProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const dictionary = getDictionary(params.locale);

  return <App locale={params.locale} dictionary={dictionary} />;
}
