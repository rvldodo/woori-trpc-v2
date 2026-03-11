import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { hyphenToPascalCase } from "@/lib/formatter";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import PengajuanSuksesSection from "./_sections/pengajuan-sukses-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]/pinjaman/[slug]/pengajuan-sukses">,
): Promise<Metadata> => {
  const { locale, slug } = await props.params;

  return getMetadata({
    path: `${PATHS.home.pinjaman.base}/${slug}/pengajuan-sukses`,
    locale,
    title: `Pengajuan Sukses | Alat Berat ${hyphenToPascalCase(slug)}`,
  });
};

export default async function PengjuanSuksesPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  return (
    <article className="main-padding-x flex flex-col justify-center items-center w-full">
      <PengajuanSuksesSection l={locale} slug={slug} />
    </article>
  );
}
