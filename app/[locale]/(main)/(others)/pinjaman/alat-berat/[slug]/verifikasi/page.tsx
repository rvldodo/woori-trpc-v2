import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { hyphenToPascalCase } from "@/lib/formatter";
import type { Metadata } from "next";
import { Locale } from "next-intl";
import VerifikasiSection from "./_sections/verifikasi-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]/pinjaman/[slug]/verifikasi">,
): Promise<Metadata> => {
  const { locale, slug } = await props.params;

  return getMetadata({
    path: `${PATHS.home.pinjaman.alatBerat.base}/${slug}/verifikasi`,
    locale,
    title: `Verifikasi | Alat Berat ${hyphenToPascalCase(slug)}`,
  });
};

export default async function VerifikasiPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  return (
    <article className="main-padding-x flex flex-col justify-center items-center w-full">
      <VerifikasiSection l={locale} slug={slug} />
    </article>
  );
}
