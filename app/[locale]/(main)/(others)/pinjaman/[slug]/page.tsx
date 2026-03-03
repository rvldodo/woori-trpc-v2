import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { hyphenToPascalCase } from "@/lib/formatter";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import FormSectionMainPage from "./_sections/form-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]/pinjaman/[slug]">,
): Promise<Metadata> => {
  const { locale, slug } = await props.params;

  return getMetadata({
    path: `${PATHS.home.pinjaman.base}/${slug}`,
    locale,
    title: `Pinjaman ${hyphenToPascalCase(slug)}`,
  });
};

export default async function PinjamanPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  return <FormSectionMainPage l={locale} slug={slug} />;
}
