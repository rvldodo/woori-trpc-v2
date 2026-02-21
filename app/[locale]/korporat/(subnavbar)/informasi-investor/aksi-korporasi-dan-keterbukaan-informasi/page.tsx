import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import AksiKorporasiSection from "./_sections/aksi-korporasi-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.aksikorporatdanKeterbukaanInformasi,
    locale,
    title: "Aksi Korporasi dan Keterbukaan Informasi",
  });
};

export default async function AksiKorporasiPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <AksiKorporasiSection l={locale} />;
}
