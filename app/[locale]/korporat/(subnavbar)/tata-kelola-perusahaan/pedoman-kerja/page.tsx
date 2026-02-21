import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import { Locale } from "next-intl";
import PedomanKerjaSection from "./_sections/pedoman-kerja-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.pedomanKerja,
    locale,
    title: "Pedoman Kerja",
  });
};

export default async function PedomanKerjaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <PedomanKerjaSection l={locale} />;
}
