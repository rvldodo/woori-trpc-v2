import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import type { Metadata } from "next";
import { Locale } from "next-intl";
import USPLayananPelanggan from "./_sections/layanan-pelanggan-usp";
import LayananPelangganForm from "./_sections/form-card";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.home.layananCustomer,
    locale,
    title: "Layanan Pelanggan",
  });
};

export default async function LayananPelangganPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <article className="flex flex-col gap-3">
      <USPLayananPelanggan />
      <LayananPelangganForm l={locale} />
    </article>
  );
}
