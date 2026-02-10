import type { Locale } from "next-intl";

export const HEADERS = {
  path: "x-path",
  lang: "x-lang",
};

const addPath = (path: string, locale?: Locale | string) =>
  `${serializePath(locale)}${path}`;
const getUrl = ({
  path,
  type = "production",
  locale,
}: {
  path: string;
  type?: keyof typeof BASE_URL;
  locale?: Locale | string;
}) => `${BASE_URL[type]}${addPath(path, locale)}`;
const isExternalLink = (href: string) =>
  href.startsWith("http") ||
  href.startsWith("mailto") ||
  href.startsWith("tel");

const getBaseUrl = () => {
  if (IS_CLIENT) return `${window.location.origin}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

const serializePath = (str: string | null | undefined) =>
  str ? `/${str}` : "";

const createUrl = (
  path: string,
  params: Record<string, number | null | string | string[] | undefined>,
) => {
  const queryString = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined) // Filter out null and undefined
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number)}`;
    })
    .join("&");
  return `${path}${queryString ? `?${queryString}` : ""}`;
};

const IS_CLIENT = typeof window !== "undefined";
const BASE_URL = {
  development: getBaseUrl(),
  production: process.env.NEXT_PUBLIC_URL,
};
const ENDPOINTS = {
  ogImage: "/assets/opengraph.png",
  sitemap: "/sitemap.xml",
  rpc: "/api/rpc",
} as const;

const PATHS = {
  home: {
    base: "/",
    pinjaman: {
      base: "/pinjaman",
      mobilBekas: "/pinjaman/mobil-bekas",
      mobilBaru: "/pinjaman/mobil-baru",
      alatBerat: {
        base: "/pinjaman/alat-berat",
        bekas: "/pinjaman/alat-berat/bekas",
        baru: "/pinjaman/alat-berat/baru",
      },
      multiguna: "/pinjaman/multiguna",
    },
    promo: "/promo",
    cabangKami: "/cabang-kami",
    faq: "/faq",
    kemitraan: "/kemitraan",
    layananCustomer: "/layanan-pelanggan",
    produkKami: {
      base: "/produk-kami",
      pembiayaanMobil: "/produk-kami/pembiayaan-mobil",
      multiguna: "/produk-kami/pembiayaan-multiguna",
      pembiayaanAlatBerat: "/produk-kami/pembiayaan-alat-berat",
      stockFinancing: "/produk-kami/stock-financing",
    },
    publikasiPenangananPengaduan: "/publikasi-penanganan-pengaduan",
  },
  korporasi: {
    base: "/korporasi",
    tentangKami: "/korporasi/tentang-kami",
    informasiInvestor: "/korporasi/informasi-investor",
    laporanKeuangan: "/korporasi/informasi-investor/laporan-keuangan",
    tataKelolaPerusahaan: {
      base: "/korporasi/tata-kelola-perusahaan",
      kodeEtik: "/korporasi/tata-kelola-perusahaan/kode-etik",
    },
    tanggungJawabSosialPerusahaan:
      "/korporasi/tanggung-jawab-sosial-perusahaan",
  },
  pengadaan: "/pengadaan",
  syaratDanKetentuan: "/syarat-dan-ketentuan",
  kebijakanPrivasi: "/kebijakan-privasi",
};

export const NEW_PATHS: Record<string, string> = {
  Individu: "/",
  Korporat: "/korporat",
  Pengadaan: "/pengadaan",
  LayananPelanggan: "/layanan-pelanggan",
  CabangKami: "/cabang-kami",
  Kemitraan: "/kemitraan",
  FAQ: "/faq",
  PublikasiPenangananPengaduan: "/publikasi-penanganan-pengaduan",
  PembiayaanMobil: "/produk-kami/pembiayaan-mobil",
  PembiayaanAlatBerat: "/produk-kami/pembiayaan-alat-berat",
  PembiayaanMultiguna: "/produk-kami/pembiayaan-multiguna",
  StockFinancing: "/produk-kami/stock-financing",
  TentangKami: "/korporasi/tentang-kami",
  InformasiInvestor: "/korporasi/informasi-investor",
  TataKelolaPerusahaan: "/korporasi/tata-kelola-perusahaan",
  TanggungJawabSosialPerusahaan: "/korporasi/tanggung-jawab-sosial-perusahaan",
};

const ALL_PATHS = Object.values(PATHS).flat();
const URLS = {
  ogImage: getUrl({ path: ENDPOINTS.ogImage }),
  sitemap: getUrl({ path: ENDPOINTS.sitemap }),
  rpc: getUrl({ path: ENDPOINTS.rpc, type: "development" }),
};

export {
  addPath,
  getBaseUrl,
  getUrl,
  isExternalLink,
  createUrl,
  serializePath,
  URLS,
  BASE_URL,
  ENDPOINTS,
  ALL_PATHS,
  PATHS,
  IS_CLIENT,
};
