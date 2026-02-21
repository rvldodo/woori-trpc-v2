import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";
import { Locale } from "next-intl";
import PiagamAuditInternalSection from "./_sections/piagam-unit-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.piagamUnitAuditInternal,
    locale,
    title: "Piagam Unit Audit Internal",
  });
};

export default async function PiagamUnitAuditPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <PiagamAuditInternalSection l={locale} />;
}
