import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import type { Metadata } from "next";
import { Locale } from "next-intl";
import KemitraanUSPSection from "./_sections/kemitraan-usp";
import KemitraanLogos from "./_sections/kemitraan-logos";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.home.kemitraan,
    locale,
    title: "Kemitraan",
  });
};

export default async function KemitraanPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="flex flex-col gap-3">
      <KemitraanUSPSection />
      <KemitraanLogos />
    </article>
  );
}
