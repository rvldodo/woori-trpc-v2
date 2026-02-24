import { Locale } from "next-intl";
import TabsNavbar from "./_components/tabs-navbar";
import TabsContentSection from "./_sections/tabs-content";

export default async function TanggunJawabPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ tanggung_jawab_sosial?: string }>;
}) {
  const { locale } = await params;
  const { tanggung_jawab_sosial = "2024" } = await searchParams;

  return (
    <TabsNavbar l={locale} activeTab={tanggung_jawab_sosial}>
      <TabsContentSection l={locale} activeTab={tanggung_jawab_sosial} />
    </TabsNavbar>
  );
}
