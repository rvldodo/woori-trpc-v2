import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import StrukturOrganisasiSection from "./_section/struktur-organisasi-section";
import { Locale } from "next-intl";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.strukturOrganisasi,
    locale,
    title: "Struktur Organisasi",
  });
};

export default async function StrukturOrganisasiPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <StrukturOrganisasiSection l={locale} />;
}
