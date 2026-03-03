import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { hyphenToPascalCase, toTitle } from "@/lib/formatter";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import HasilSimulasiSection from "./_sections/hasil-simulasi-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]/pinjaman/[slug]">,
): Promise<Metadata> => {
  const { locale, slug } = await props.params;

  return await getMetadata({
    path: `${PATHS.home.pinjaman.base}/tenor/${slug}`,
    locale,
    title: `Hasil Simulasi | ${hyphenToPascalCase(slug)}`,
  });
};

export default async function HasilSimulasiPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  return (
    <article className="main-padding-x flex flex-col justify-center items-center w-full">
      <HasilSimulasiSection l={locale} slug={slug} />
    </article>
  );
}
