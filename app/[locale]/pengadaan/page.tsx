import type { Metadata } from "next";
import { PATHS } from "@/app/urls";
import { getMetadata } from "@/app/metadata";
import USPSection from "./_sections/usp-section";
import TableSection from "./_sections/table-section";
import { Locale } from "next-intl";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.pengadaan,
    locale,
    title: "Pengadaan",
  });
};

export default async function PengadaanPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="flex flex-col gap-3">
      <USPSection />
      <TableSection l={locale} />
    </article>
  );
}
