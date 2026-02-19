import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import DewanDireksiSection from "./_sections/dewan-direksi-section";
import { Locale } from "next-intl";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.dewanDireksidanKomisaris,
    locale,
    title: "Dewan Direksi dan Komisaris",
  });
};

export default async function DewanDireksiPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <DewanDireksiSection l={locale} />;
}
