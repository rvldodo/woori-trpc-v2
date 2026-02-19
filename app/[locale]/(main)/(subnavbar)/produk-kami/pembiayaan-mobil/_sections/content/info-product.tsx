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
  const t = useTranslations("OurProduct.carLoan");

  return (
    <section className="relative w-full py-3 flex flex-col overflow-hidden z-10">
      <div className="flex md:flex-row flex-col w-full justify-between gap-2 pb-8">
        <Text variant="display-md" className="md:w-[40vw] w-full">
          {t("informasiProduk.hero.title")}
        </Text>
        <Text className="w-full" variant="body-md-regular">
          {t("informasiProduk.hero.description")}
        </Text>
      </div>
      <div>
        <Text variant="display-md">{t("informasiProduk.products.title")}</Text>
        <Accordion type="single" defaultValue="new">
          <AccordionItem value="new">
            <AccordionTrigger>
              <Text variant="display-sm">
                {t("informasiProduk.products.items.new.title")}
              </Text>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-5 h-auto">
              <Text variant="body-md-regular">
                {t.rich("informasiProduk.products.items.new.content", {
                  br: (chunks) => (
                    <>
                      <br /> {chunks}
                    </>
                  ),
                })}
              </Text>
              <div className="flex flex-col ">
                <div className="flex gap-2">
                  <Text variant="caption-md-semi">
                    {t(
                      "informasiProduk.products.items.new.features.tenure.label",
                    )}
                  </Text>
                  <Text variant="caption-md-regular">
                    {t(
                      "informasiProduk.products.items.new.features.tenure.value",
                    )}
                  </Text>
                </div>
                <div className="flex gap-2">
                  <Text variant="caption-md-semi">
                    {t(
                      "informasiProduk.products.items.new.features.interest.label",
                    )}
                  </Text>
                  <Text variant="caption-md-regular">
                    {t(
                      "informasiProduk.products.items.new.features.interest.value",
                    )}
                  </Text>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="used">
            <AccordionTrigger>
              <Text variant="display-sm">
                {t("informasiProduk.products.items.used.title")}
              </Text>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-5 h-auto">
              <Text variant="body-md-regular">
                {t.rich("informasiProduk.products.items.used.content", {
                  br: (chunks) => (
                    <>
                      <br /> {chunks}
                    </>
                  ),
                })}
              </Text>
              <div className="flex flex-col ">
                <div className="flex gap-2">
                  <Text variant="caption-md-semi">
                    {t(
                      "informasiProduk.products.items.used.features.tenure.label",
                    )}
                  </Text>
                  <Text variant="caption-md-regular">
                    {t(
                      "informasiProduk.products.items.used.features.tenure.value",
                    )}
                  </Text>
                </div>
                <div className="flex gap-2">
                  <Text variant="caption-md-semi">
                    {t(
                      "informasiProduk.products.items.used.features.interest.label",
                    )}
                  </Text>
                  <Text variant="caption-md-regular">
                    {t(
                      "informasiProduk.products.items.used.features.interest.value",
                    )}
                  </Text>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
