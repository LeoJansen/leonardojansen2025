import type { Locale } from './config';
import en from './messages/en.json';
import pt from './messages/pt.json';

const dictionaries = {
  en,
  pt,
} as const satisfies Record<Locale, typeof en>;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
