import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import type { Metadata } from "next";
import { Locale } from "next-intl";
import FAQSection from "./_sections/faq-section";
import FAQContactSection from "./_sections/contact-section";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.home.faq,
    locale,
    title: "FAQ",
    description: "Frequently Asked Questions",
  });
};

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="flex flex-col gap-3">
      <FAQSection l={locale} />
      <FAQContactSection />
    </article>
  );
}
