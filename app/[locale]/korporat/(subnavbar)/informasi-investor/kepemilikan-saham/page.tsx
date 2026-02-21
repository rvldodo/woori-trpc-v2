import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import { Locale } from "next-intl";
import KepemilikanSahamSection from "./_sections/kepemilikan-saham-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.kepemilikanSaham,
    locale,
    title: "Kepemilikan Saham",
  });
};

export default async function KepemilikanSahamPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <KepemilikanSahamSection l={locale} />;
}
