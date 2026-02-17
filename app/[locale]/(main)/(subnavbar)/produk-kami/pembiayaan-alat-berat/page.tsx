import { getMetadata } from "@/app/metadata";
import type { Metadata } from "next";
import { PATHS } from "@/app/urls";
import { Locale } from "next-intl";
import HeroSection from "./_sections/hero-section";
import TabsSection from "./_sections/tabs-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.home.produkKami.pembiayaanAlatBerat,
    locale,
    title: "Pembiayaan Alat Berat",
    description: "Solusi Pinjaman Alat Berat yang Berkualitas dan Ekonomis",
    imageUrl: "/assets/image/our-products/alat-berat.png",
  });
};

export default async function PembiayaanAlatBerat({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="flex flex-col gap-3">
      <HeroSection />
      <TabsSection l={locale} />
    </article>
  );
}
