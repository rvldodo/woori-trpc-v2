import type { LANGS } from "@/i18n/lang";
import type { useLocale, useTranslations } from "next-intl";

export type SeachParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export interface IntlSectionProps {
  t: ReturnType<typeof useTranslations>;
}

export type Lang = (typeof LANGS)[number];
export type Locale = ReturnType<typeof useLocale>;
export type LangTarget = Lang | null | undefined | string;

export type SubnavbarProps = {
  id: number;
  isActive: boolean;
  subNavbarTabs: SubnavbarTabsProps[];
  subnavbar: Record<Locale, string>;
  mainNavbarId: number;
};

export type SubnavbarTabsProps = {
  id: number;
  tabs: Record<Locale, string>;
  subNavbarId: number;
};

export type LocaleContentOptional = Record<Locale, string>;

export type ProcurementType = {
  id: number;
  createdTime: string;
  updatedTime: string | null;
  deletedTime: string | null;
  title: LocaleContentOptional | null;
  description: LocaleContentOptional | null;
  deadlineDate: string | null;
  status: boolean | null;
  requirements: LocaleContentOptional | null;
  category: LocaleContentOptional | null;
  files: string[] | null;
};

export type FilterParams = {
  key?: string;
  limit?: number;
  page?: number;
};

export interface MapMarkerProps {
  id: number;
  name: string;
  lng: number;
  lat: number;
}
