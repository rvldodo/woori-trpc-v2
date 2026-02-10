import type React from "react";
import { Fragment } from "react";
import Subnavbar from "./_components/subnavbar";
import type { Locale } from "next-intl";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function MainLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <Fragment>
      <Subnavbar l={locale} />
      {children}
    </Fragment>
  );
}
