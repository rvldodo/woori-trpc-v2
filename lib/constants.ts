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

export const TOOLTIP_INSURANCE_TYPE = [
  {
    id: 1,
    title: {
      en: "Total Loss Only (TLO)",
      id: "Total Loss Only (TLO)",
    },
    description: {
      en: "Total Loss Only (TLO) insurance covers major losses if the damage reaches 75% or more of the vehicle's value, protecting you in the event of a serious accident or theft.",
      id: "Asuransi Total Loss (TLO) menanggung kerugian besar jika kerusakannya mencapai 75% atau lebih dari nilai kendaraan, melindungi Anda jika terjadi kecelakaan parah atau pencurian.",
    },
  },
  {
    id: 2,
    title: {
      en: "Comprehensive",
      id: "Komprehensif",
    },
    description: {
      en: "Comprehensive insurance coverage for all types of damage, from minor scratches to total loss.",
      id: "Cakupan asuransi komprehensif untuk kerusakan, dari goresan kecil hingga kerugian total.",
    },
  },
  {
    id: 3,
    title: {
      en: "Combination",
      id: "Kombinasi",
    },
    description: {
      en: "Combination insurance starts with comprehensive coverage and then switches to TLO, adapting to changes in your vehicle's value over time.",
      id: "Asuransi kombinasi dimulai dengan cakupan komprehensif dan kemudian beralih ke TLO, beradaptasi dengan perubahan nilai kendaraan Anda dari waktu ke waktu.",
    },
  },
];

export const INSURANCE_TYPE = [
  {
    value: "1",
    label: {
      en: "Comprehensive",
      id: "Komprehensif",
    },
  },
  {
    value: "2",
    label: {
      en: "Total Loss Only (TLO)",
      id: "TLO",
    },
  },
  {
    value: "3",
    label: {
      en: "Combination",
      id: "Kombinasi",
    },
  },
];

export const DOWN_PAYMENT_TYPE = [
  {
    value: "1",
    label: {
      en: "DP",
      id: "DP",
    },
    title: {
      en: "Down Payment",
      id: "Uang Muka",
    },
    description: {
      en: "The initial amount paid upfront, excluding any additional fees or changes.",
      id: "Jumlah awal yang dibayarkan di muka, tidak termasuk biaya tambahan atau perubahan apa pun.",
    },
  },
  {
    value: "2",
    label: {
      en: "TDP",
      id: "TDP",
    },
    title: {
      en: "Total Down Payment",
      id: "Total Uang Muka",
    },
    description: {
      en: "The total amount paid upfront, including fees, insurance, and other related costs.",
      id: "Jumlah keseluruhan yang dibayarkan di muka, termasuk biaya, asuransi, dan biaya terkait lainnya.",
    },
  },
];
