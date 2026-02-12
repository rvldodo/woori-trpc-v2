"use client";

import { Text } from "@/components/html/text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export default function InfoProdukTabs() {
  const t = useTranslations("OurProduct.stockFinancing");

  return (
    <section className="relative w-full py-3 flex flex-col overflow-hidden z-10">
      <div className="flex md:flex-row flex-col w-full justify-between gap-2 pb-8">
        <Text variant="display-md" className="md:w-[30vw] w-full">
          {t("informasiProduk.hero.title")}
        </Text>
        <Text className="w-full" variant="body-md-regular">
          {t("informasiProduk.hero.description")}
        </Text>
      </div>
      <div>
        <Text variant="display-md">{t("informasiProduk.products.title")}</Text>
        <Accordion type="single" defaultValue="stock-financing">
          <AccordionItem value="stock-financing">
            <AccordionTrigger>
              <Text variant="display-sm">
                {t("informasiProduk.products.items.stockFinancing.title")}
              </Text>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-5">
              <Text variant="body-md-regular">
                {t.rich(
                  "informasiProduk.products.items.stockFinancing.content",
                  {
                    br: (chunks) => (
                      <>
                        <br /> {chunks}
                      </>
                    ),
                  },
                )}
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
