import { useLocale } from "next-intl";
import React from "react";
import { Fragment } from "react/jsx-runtime";
import Subnavbar from "./_components/subnavbar";

type Props = { children: React.ReactNode };

export default function LayoutKorporasi({ children }: Props) {
  const locale = useLocale();

  return (
    <Fragment>
      <Subnavbar l={locale} />
      {children}
    </Fragment>
  );
}
