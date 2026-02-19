import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.lembagadanProfesiPenunjang,
    locale,
    title: "Lembaga dan Profesi Penunjang",
  });
};

export default function LembagaDanProfesiPage() {
  return <div></div>;
}
