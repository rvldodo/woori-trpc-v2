import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import type { Metadata } from "next";
import { Locale } from "next-intl";
import USPCabangKamiSection from "./_sections/cabang-kami-usp";
import DataCabangSection from "./_sections/data-cabang";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.home.cabangKami,
    locale,
    title: "Cabang Kami",
  });
};

export default async function CabangKamiPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="flex flex-col gap-3">
      <USPCabangKamiSection />
      <DataCabangSection l={locale} />
    </article>
  );
}
