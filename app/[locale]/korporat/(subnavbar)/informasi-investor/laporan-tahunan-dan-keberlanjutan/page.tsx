import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";

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

export default function LaporanTahunanPage() {
  return <div></div>;
}
