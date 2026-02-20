import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import { Locale } from "next-intl";
import PenghargaanSection from "./_sections/penghargaan-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.penghargaan,
    locale,
    title: "Penghargaan",
  });
};

export default async function PenghargaanPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <PenghargaanSection l={locale} />;
}
