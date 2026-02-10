"use client";

import { Text } from "@/components/html/text";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function USPSection() {
  const t = useTranslations("Procurement.uspSection");

  return (
    <section className="main-padding-x flex md:flex-row flex-col gap-4 py-8">
      <div className="w-full py-5 text-[#2d2d2d] flex md:flex-row flex-col md:justify-between justify-center items-center bg-[#f7f7f7] relative">
        <div className="absolute left-[70rem] w-[20vw] aspect-square rounded-full lg:bg-[hsla(203,89%,48%,0.4)] bg-[hsla(203,89%,48%,0.2)] lg:blur-[200px] blur-[600px] blur-element" />
        <div className="absolute lg:left-[50rem] left-[70rem] w-[10vw] aspect-square rounded-full lg:bg-[hsla(262,83%,85%,0.3)] bg-[hsla(262,83%,85%,0.15)] blur-[600px] lg:blur-[200px] blur-element" />{" "}
        <Text variant="display-lg">{t("title")}</Text>
        <Card className="p-3">
          <CardContent className="p-3 text-[#2d2d2d] bg-[#ffffff]/20 backdrop-blur-xl rounded-[16px] flex items-center gap-2 md:w-[30vw] w-full overflow-hidden relative md:mt-0 mt-5">
            <Text variant="body-lg-medium" className="py-3">
              {t("description")}
            </Text>
            <ArrowDown className="size-25 text-primary" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
