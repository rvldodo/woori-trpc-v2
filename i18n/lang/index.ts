import { Lang } from "@/types";

export const LANGS = ["id", "en"] as const;
export const DEFAULT_LANG: Lang = "id";
export const LANGUAGES: Record<
  Lang,
  {
    label: string;
    locale: string;
    lang: Lang;
  }
> = {
  id: {
    label: "Indonesia",
    lang: "id",
    locale: "id-IDN",
  },
  en: {
    label: "English",
    lang: "en",
    locale: "en-US",
  },
};

export const LANGUAGE_OPTIONS = Object.entries(LANGUAGES).map(([_, e]) => ({
  ...e,
}));
