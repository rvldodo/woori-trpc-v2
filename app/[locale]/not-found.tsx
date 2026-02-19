import NotFoundSection from "./_sections/not-found-section";

import { getMetadata } from "@/app/metadata";
import { Metadata } from "next";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    locale,
    title: "404 Error Not Found",
  });
};

export default function NotFound() {
  return <NotFoundSection />;
}
