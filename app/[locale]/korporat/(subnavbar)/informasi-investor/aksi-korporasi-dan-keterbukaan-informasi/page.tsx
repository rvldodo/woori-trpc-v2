import { getMetadata } from "@/app/metadata";
import { PATHS } from "@/app/urls";
import { Metadata } from "next";

export const generateMetadata = async (
  props: PageProps<"/[locale]">,
): Promise<Metadata> => {
  const { locale } = await props.params;

  return await getMetadata({
    path: PATHS.korporasi.aksikorporatdanKeterbukaanInformasi,
    locale,
    title: "Aksi Korporasi dan Keterbukaan Informasi",
  });
};

export default function AksiKorporasiPage() {
  return <div></div>;
}
