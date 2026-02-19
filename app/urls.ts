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
    base: "/korporat",
    tentangKami: "/korporat/tentang-kami",
    penghargaan: "/korporat/tentang-kami/penghargaan",
    lembagadanProfesiPenunjang:
      "/korporat/tentang-kami/lembaga-dan-profesi-penunjang",
    dewanDireksidanKomisaris:
      "/korporat/tentang-kami/dewan-direksi-dan-komisaris",
    strukturOrganisasi: "/korporat/tentang-kami/struktur-organisasi",
    informasiInvestor: "/korporat/informasi-investor",
    presentasiPerusahaan: "/korporat/informasi-investor/presentasi-perusahaan",
    aksikorporatdanKeterbukaanInformasi:
      "/korporat/informasi-investor/aksi-korporasi-dan-keterbukaan-informasi",
    laporanTahunandanKeberlanjutan:
      "/korporat/informasi-investor/laporan-tahunan-dan-keberlanjutan",
    laporanKeuangan: "/korporat/informasi-investor/laporan-keuangan",
    rapatUmumPemegangSaham:
      "/korporat/informasi-investor/rapat-umum-pemegang-saham",
    kepemilikanSaham: "/korporat/informasi-investor/kepemilikan-saham",
    tataKelolaPerusahaan: {
      base: "/korporat/tata-kelola-perusahaan",
      kodeEtik: "/korporat/tata-kelola-perusahaan/kode-etik",
    },
    dokumenAnggaranDasar:
      "/korporat/tata-kelola-perusahaan/dokumen-anggaran-dasar",
    kebijakanManajemenResiko:
      "/korporat/tata-kelola-perusahaan/kebijakan-manajemen-resiko",
    kodeEtik: "/korporat/tata-kelola-perusahaan/kode-etik",
    strukturTataKelolaPerusahaan:
      "/korporat/tata-kelola-perusahaan/struktur-tata-kelola-perusahaan",
    piagamUnitAuditInternal:
      "/korporat/tata-kelola-perusahaan/piagam-unit-audit-internal",
    pedomanKerja: "/korporat/tata-kelola-perusahaan/pedoman-kerja",
    tanggungJawabSosialPerusahaan: "/korporat/tanggung-jawab-sosial-perusahaan",
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
  TentangKami: "/korporat/tentang-kami",
  Penghargaan: "/korporat/tentang-kami/penghargaan",
  LembagadanProfesiPenunjang:
    "/korporat/tentang-kami/lembaga-dan-profesi-penunjang",
  DewanDireksidanKomisaris:
    "/korporat/tentang-kami/dewan-direksi-dan-komisaris",
  StrukturOrganisasi: "/korporat/tentang-kami/struktur-organisasi",
  InformasiInvestor: "/korporat/informasi-investor",
  PresentasiPerusahaan: "/korporat/informasi-investor/presentasi-perusahaan",
  AksiKorporasidanKeterbukaanInformasi:
    "/korporat/informasi-investor/aksi-korporasi-dan-keterbukaan-informasi",
  LaporanTahunandanKeberlanjutan:
    "/korporat/informasi-investor/laporan-tahunan-dan-keberlanjutan",
  LaporanKeuangan: "/korporat/informasi-investor/laporan-keuangan",
  RapatUmumPemegangSaham:
    "/korporat/informasi-investor/rapat-umum-pemegang-saham",
  KepemilikanSaham: "/korporat/informasi-investor/kepemilikan-saham",
  TataKelolaPerusahaan: "/korporat/tata-kelola-perusahaan",
  DokumenAnggaranDasar:
    "/korporat/tata-kelola-perusahaan/dokumen-anggaran-dasar",
  KebijakanManajemenResiko:
    "/korporat/tata-kelola-perusahaan/kebijakan-manajemen-resiko",
  KodeEtik: "/korporat/tata-kelola-perusahaan/kode-etik",
  StrukturTataKelolaPerusahaan:
    "/korporat/tata-kelola-perusahaan/struktur-tata-kelola-perusahaan",
  PiagamUnitAuditInternal:
    "/korporat/tata-kelola-perusahaan/piagam-unit-audit-internal",
  PedomanKerja: "/korporat/tata-kelola-perusahaan/pedoman-kerja",
  TanggungJawabSosialPerusahaan: "/korporat/tanggung-jawab-sosial-perusahaan",
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
