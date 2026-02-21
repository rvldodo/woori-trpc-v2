import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import { Locale } from "next-intl";
import KebijakanManajemenSection from "./_sections/kebijakan-manajemen-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.kebijakanManajemenResiko,
    locale,
    title: "Kebijakan Manajemen Resiko",
  });
};

export default async function KebijakanManajemenPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <KebijakanManajemenSection l={locale} />;
}
