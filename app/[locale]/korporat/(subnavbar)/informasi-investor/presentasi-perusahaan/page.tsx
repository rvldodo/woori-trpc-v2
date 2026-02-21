import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import { Locale } from "next-intl";
import PresentasiPerusahaanSection from "./_sections/presentasi-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.presentasiPerusahaan,
    locale,
    title: "Presentasi Perusahaan",
  });
};

export default async function PresentasiPerusahaanPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <PresentasiPerusahaanSection l={locale} />;
}
