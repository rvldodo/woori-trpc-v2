import { getMetadata } from "@/app/metadata";
import type { Metadata } from "next";
import { useLocale } from "next-intl";
import type React from "react";
import { Fragment } from "react/jsx-runtime";
import HeroSectionTanggungJawab from "./_sections/hero-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    locale,
    title: "Tanggun Jawab Sosial Perusahaan",
  });
};

type Props = { children: React.ReactNode };

export default function LayoutTentangKami({ children }: Props) {
  const locale = useLocale();

  return (
    <Fragment>
      <HeroSectionTanggungJawab l={locale} />
      {children}
    </Fragment>
  );
}
