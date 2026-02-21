import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import { Locale } from "next-intl";
import KodeEtikDetailSection from "./_sections/detail-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]/korporat/kode-etik-detail/[slug]">,
): Promise<Metadata> => {
  const { locale, slug } = await props.params;

  return await getMetadata({
    path: `${PATHS.korporasi.kodeEtikDetail}/${slug}`,
    locale,
    title: `Kode Etik | ${decodeURIComponent(slug)}`,
  });
};

export default async function KodeEtikDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  return <KodeEtikDetailSection l={locale} slug={decodeURIComponent(slug)} />;
}
