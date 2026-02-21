import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import { Locale } from "next-intl";
import LaporanTahunanSection from "./_sections/laporan-tahunan-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.laporanTahunandanKeberlanjutan,
    locale,
    title: "Laporan Tahunan dan Keberlanjutan",
  });
};

export default async function LaporanTahunanPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <LaporanTahunanSection l={locale} />;
}
