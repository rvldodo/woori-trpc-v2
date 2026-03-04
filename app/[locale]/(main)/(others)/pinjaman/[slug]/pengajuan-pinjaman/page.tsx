import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { hyphenToPascalCase } from "@/lib/formatter";
import type { Metadata } from "next";
import { Locale } from "next-intl";
import PengajuanPinjamanSection from "./_sections/pengajuan-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]/pinjaman/[slug]/pengajuan-pinjaman">,
): Promise<Metadata> => {
  const { locale, slug } = await props.params;

  return getMetadata({
    path: `${PATHS.home.pinjaman.base}/${slug}/pengajuan-pinjaman`,
    locale,
    title: `Pengajuan Pinjaman | ${hyphenToPascalCase(slug)}`,
  });
};

export default async function PengajuanPinjamanPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  return (
    <article className="main-padding-x flex flex-col justify-center items-center w-full">
      <PengajuanPinjamanSection l={locale} slug={slug} />
    </article>
  );
}
