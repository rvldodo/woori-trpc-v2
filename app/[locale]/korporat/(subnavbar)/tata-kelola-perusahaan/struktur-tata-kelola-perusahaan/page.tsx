import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import StrukturTataKelolaSection from "./_sections/struktur-tata-kelola-section";
import { Locale } from "next-intl";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.strukturTataKelolaPerusahaan,
    locale,
    title: "Struktur Tata Kelola Perusahaan",
  });
};

export default async function StrukturTataKelolaPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <StrukturTataKelolaSection l={locale} />;
}
