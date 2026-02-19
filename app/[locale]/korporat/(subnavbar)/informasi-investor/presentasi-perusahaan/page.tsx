import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.presentasiPerusahaan,
    locale,
    title: "Presentasi Perusahaan",
  });
};

export default function PresentasiPerusahaanPage() {
  return <div></div>;
}
