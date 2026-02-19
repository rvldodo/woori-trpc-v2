import { getMetadata } from "@/app/metadata";
import type { Metadata } from "next";
import { useLocale } from "next-intl";
import type React from "react";
import { Fragment } from "react/jsx-runtime";
import HeroSectionTentangKami from "./_sections/hero-section";
import TabsNavbar from "./_components/tabs-navbar";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    locale,
    title: "Tentang Kami",
  });
};

type Props = { children: React.ReactNode };

export default function LayoutTataKelolaPerusahaan({ children }: Props) {
  const locale = useLocale();

  return (
    <Fragment>
      <HeroSectionTentangKami l={locale} />
      <TabsNavbar l={locale} />
      {children}
    </Fragment>
  );
}
