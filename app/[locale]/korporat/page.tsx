import type { Metadata } from "next";
import { PATHS } from "@/app/urls";
import { getMetadata } from "@/app/metadata";
import HeroSection from "./_sections/hero-section";
import { Locale } from "next-intl";
import CompanyProfile from "./_sections/company-profile";
import VisiMisiSection from "./_sections/visi-misi";
import MilestoneSection from "./_sections/milestone";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.base,
    locale,
    title: "Korporasi",
  });
};

export default async function KorporasiPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="flex flex-col gap-3">
      <HeroSection l={locale} />
      <CompanyProfile l={locale} />
      <VisiMisiSection l={locale} />
      <MilestoneSection l={locale} />
    </article>
  );
}
