import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import type { Metadata } from "next";
import { Locale } from "next-intl";
import SyaratDanKetentuanSection from "./_sections/syarat-dan-ketentuan-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]/syarat-dan-ketentuan">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return getMetadata({
    path: PATHS.syaratDanKetentuan,
    locale,
    title: "Syarat dan Ketentuan",
  });
};

export default async function SyaratDanKetentuan({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="flex flex-col gap-3">
      <SyaratDanKetentuanSection l={locale} />
    </article>
  );
}
