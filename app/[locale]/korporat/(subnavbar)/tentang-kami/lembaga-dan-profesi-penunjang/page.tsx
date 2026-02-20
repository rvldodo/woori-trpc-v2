import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import { Locale } from "next-intl";
import LembagaDanProfesiSection from "./_sections/lembaga-dan-profesi-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.lembagadanProfesiPenunjang,
    locale,
    title: "Lembaga dan Profesi Penunjang",
  });
};

export default async function LembagaDanProfesiPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <LembagaDanProfesiSection l={locale} />;
}
