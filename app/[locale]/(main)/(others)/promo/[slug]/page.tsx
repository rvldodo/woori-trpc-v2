import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { toTitleCase } from "@/lib/formatter";
import type { Metadata } from "next";
import { Locale } from "next-intl";
import PromoDetailSection from "./_sections/promo-detail-section";
import FormSection from "./_sections/form-section";
import { api } from "@/trpc/server";

export const generateMetadata = async (
  props: PageProps<"/[locale]/promo/[slug]">,
): Promise<Metadata> => {
  const { locale, slug } = await props.params;

  return getMetadata({
    path: `${PATHS.home.promo}/${slug}`,
    locale,
    title: `Promos | ${toTitleCase(slug)}`,
  });
};

export default async function PromoDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  const data = await api.logged.main.promos.detail.query({
    slug: toTitleCase(slug),
  });

  if (!data) return null;

  return (
    <article className="flex flex-col gap-3">
      <PromoDetailSection l={locale} slug={toTitleCase(slug)} />
      <FormSection l={locale} promo_id={data.data.promos.id} />
    </article>
  );
}
