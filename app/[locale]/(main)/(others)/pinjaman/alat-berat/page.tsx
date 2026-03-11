import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import AlatBeratSection from "./_sections/alat-berat-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]/pinjaman/alat-berat">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return getMetadata({
    path: `${PATHS.home.pinjaman.alatBerat.base}`,
    locale,
    title: `Pinjaman Alat Berat`,
  });
};

export default async function PinjamanAlatBerat({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="main-padding-x flex flex-col justify-center items-center w-full">
      <AlatBeratSection l={locale} />
    </article>
  );
}
