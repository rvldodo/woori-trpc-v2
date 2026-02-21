import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import { Locale } from "next-intl";
import LaporanKeuanganSection from "./_sections/laporan-keuangan-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.laporanKeuangan,
    locale,
    title: "Laporan Keuangan",
  });
};

export default async function LaporanKeuanganPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <LaporanKeuanganSection l={locale} />;
}
