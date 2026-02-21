import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import { Locale } from "next-intl";
import RUPSSection from "./_sections/rups-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.rapatUmumPemegangSaham,
    locale,
    title: "Rapat Umum Pemegang Saham",
  });
};

export default async function RapatUmumPemegangSahamPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <RUPSSection l={locale} />;
}
