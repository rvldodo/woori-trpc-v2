import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import { Locale } from "next-intl";
import KodeEtikSection from "./_sections/kode-etik-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.kodeEtik,
    locale,
    title: "Kode Etik",
  });
};

export default async function KodeEtikPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <KodeEtikSection l={locale} />;
}
