import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import type { Metadata } from "next";
import { Locale } from "next-intl";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.home.publikasiPenangananPengaduan,
    locale,
    title: "Publikasi Penanganan Pengaduan",
  });
};

export default async function PublikasiPenangananPengaduanPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return <article className="flex flex-col gap-3"></article>;
}
