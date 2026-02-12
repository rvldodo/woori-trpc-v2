import { getMetadata } from "@/app/metadata";
import type { Metadata } from "next";
import { PATHS } from "@/app/urls";
import { Locale } from "next-intl";
import HeroSection from "./_sections/hero-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.home.produkKami.pembiayaanMobil,
    locale,
    title: "Pembiayaan Mobil",
    description: "Dapatkan Mobil Impian Anda Tanpa Kesulitan!",
  });
};

export default async function PembiayaanMobil({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="flex flex-col gap-3">
      <HeroSection />
    </article>
  );
}
