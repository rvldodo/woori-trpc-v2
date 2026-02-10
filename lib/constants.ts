import type { Locale } from "next-intl";

export const PAGINATION_LIMIT = 10;
export const PAGINATION_LIMITS = [PAGINATION_LIMIT, 50, 100];

export const MAIN_TITLE = "Woorifinance Indonesia";
export const MAIN_DESCRIPTION = "PT Woorifinance Indonesia Tbk";

export const ERROR_FETCH = "Failed to fetch data";
export const ERROR_DATA_NOT_FOUND = "Data not found";
export const ERROR_BAD_REQUEST = "Bad request";
export const ERROR_DATA_EXISTING = "Data already exist";
export const ERROR_CREATE_DATA = "Failed to create data";
export const ERROR_UPDATE_DATA = "Failed to update data";
export const ERROR_DELETE_DATA = "Failed to delete data";
export const ERROR_CONNECT_DB = "Failed to connect to database";

export const SLUGS_TO_REMOVE = ["home"];

export const LOCALES: Record<
  Locale,
  { label: string; value: Locale; locale: `${string}-${string}` }
> = {
  en: { label: "English", value: "en", locale: "en-US" },
  id: { label: "Bahasa", value: "id", locale: "id-ID" },
};

export const LOCALES_OPTIONS = Object.entries(LOCALES).map(([_, e]) => ({
  ...e,
}));

export const ICONS = {
  "whatsapp-uncolored": "garden:whatsapp-fill-16",
  whatsapp: "logos:whatsapp-icon",
  email: "material-symbols:stacked-email-rounded",
  phone: "material-symbols:phone-enabled-sharp",
  linkedin: "mdi:linkedin",
  instagram: "mdi:instagram",
};

export const CURRENT_STACK = [
  "Next.js",
  "Typescript",
  "Golang",
  "Postgresql",
  "SQLServer",
  "Docker",
];
