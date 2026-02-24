import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import { Locale } from "next-intl";
import { toTitleCase } from "@/lib/formatter";
import TanggungJawabSosialDetailSection from "./_sections/tanggung-jawab-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]/korporat/tanggung-jawab-sosial-perusahaan-detail/[slug]">,
): Promise<Metadata> => {
  const { locale, slug } = await props.params;

  return await getMetadata({
    path: `${PATHS.korporasi.kodeEtikDetail}/${slug}`,
    locale,
    title: `Tanggung Jawab Sosial Perusahaan | ${toTitleCase(slug)}`,
  });
};

export default async function KodeEtikDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  return (
    <TanggungJawabSosialDetailSection
      l={locale}
      slug={decodeURIComponent(slug)}
    />
  );
}
