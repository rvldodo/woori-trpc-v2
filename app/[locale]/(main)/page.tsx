import { getMetadata } from "@/app/metadata";
import CarouselPromoSection from "./_sections/carousel-promo";
import type { Metadata } from "next";
import { PATHS } from "@/app/urls";
import ProductKamiSection from "./_sections/produk-kami-section";
import { Locale } from "next-intl";
import SimulatorSection from "./_sections/simulator";
import PromoSection from "./_sections/promo-section";
import FAQSection from "./_sections/faq-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.home.base,
    locale,
    title: "Individu",
  });
};

export default async function Homepage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="flex flex-col gap-3">
      <CarouselPromoSection />
      <ProductKamiSection l={locale} />
      <SimulatorSection l={locale} />
      <PromoSection l={locale} />
      <FAQSection l={locale} />
    </article>
  );
}
