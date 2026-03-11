import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import type { Metadata } from "next";
import KebijakanPrivasiSection from "./_sections/kebijakan-privasi-section";
import { Locale } from "next-intl";

export const generateMetadata = async (
  props: PageProps<"/[locale]/kebijakan-privasi">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return getMetadata({
    path: PATHS.kebijakanPrivasi,
    locale,
    title: "Kebijakan Privasi",
  });
};

export default async function KebijakanPrivasi({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="flex flex-col gap-3">
      <KebijakanPrivasiSection l={locale} />
    </article>
  );
}
