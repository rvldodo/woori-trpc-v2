import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import type { Locale } from "next-intl";
import PengadatanDetailSection from "./_sections/detail-section";
import { toTitleCase } from "@/lib/formatter";

export const generateMetadata = async (
  props: PageProps<"/[locale]/pengadaan/[slug]">,
): Promise<Metadata> => {
  const { locale, slug } = await props.params;

  return await getMetadata({
    path: `${PATHS.pengadaan}/${decodeURI(slug)}`,
    locale,
    title: toTitleCase(slug),
  });
};

export default async function PengadaanDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  return <PengadatanDetailSection l={locale} slug={decodeURI(slug)} />;
}
