"use client";

import { Text } from "@/components/html/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { ProdukTabsTrigger } from "@/types";
import type { Locale } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import InfoProdukTabs from "./content/info-product";
import ProsesPengajuanTabs from "./content/proses-pengajuan";

type Props = {
  l: Locale;
};

export default function TabsSection({ l }: Props) {
  const sidebarContent: Array<ProdukTabsTrigger> = [
    {
      value: "informasi-produk",
      label: {
        en: "Product Information",
        id: "Informasi Produk",
      },
      content: <InfoProdukTabs />,
    },
    {
      value: "proses-pengajuan",
      label: {
        en: "Submission Process",
        id: "Proses Pengajuan",
      },
      content: <ProsesPengajuanTabs />,
    },
    {
      value: "persyaratan-dan-dokumen",
      label: {
        en: "Requirements and Documents",
        id: "Persyaratan dan Dokumen",
      },
    },
    {
      value: "metode-pembayaran",
      label: {
        en: "Payment Methods",
        id: "Metode Pembayaran",
      },
    },
    {
      value: "riplay",
      label: {
        en: "RIPLAY",
        id: "RIPLAY",
      },
    },
  ];

  const [filter, setFilter] = useQueryStates({
    he_content: parseAsString.withDefault("informasi-produk"),
  });

  return (
    <article className="main-padding-x w-full justify-start items-center">
      <div className="flex flex-col gap-3"></div>
      <Tabs
        defaultValue="informasi-produk"
        value={filter.he_content}
        onValueChange={(e) => setFilter(() => ({ he_content: e }))}
        className="grid grid-cols-1 px-0 md:grid-cols-4 gap-3"
        orientation="vertical"
      >
        <section className="col-span-1">
          <Text variant="display-sm" className="py-1">
            Pembiayaan Mobil
          </Text>
          <TabsList className="flex flex-col gap-3 items-start col-span-1">
            {sidebarContent.map((e, idx) => (
              <TabsTrigger
                key={idx.toString()}
                value={e.value}
                className={cn(
                  "flex justify-start m-0 p-2 hover:bg-hover-blue",
                  filter.he_content === e.value ? "border border-primary" : "",
                )}
              >
                <Text variant="body-md-regular" className="text-start">
                  {e.label[l]}
                </Text>
              </TabsTrigger>
            ))}
          </TabsList>
        </section>

        <section className="flex w-full col-span-3">
          {sidebarContent.map((e, idx) => (
            <TabsContent
              className="flex w-full"
              value={e.value}
              key={idx.toString()}
            >
              {e.content}
            </TabsContent>
          ))}
        </section>
      </Tabs>
    </article>
  );
}
