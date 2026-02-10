"use client";

import { Text } from "@/components/html/text";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function USPCabangKamiSection() {
  const t = useTranslations("OurBranch.uspSection");

  return (
    <section className="main-padding-x py-8 flex flex-col justify-start items-center gap-3">
      <div className="absolute left-[70rem] w-[20vw] aspect-square rounded-full bg-[rgba(10,156,237,0.4)] blur-[200px]" />
      <div className="absolute left-[50rem] w-[10vw] aspect-square rounded-full bg-[rgba(196,181,253,0.3)] blur-[200px]" />
      <div className="absolute right-[70rem] w-[20vw] aspect-square rounded-full bg-[rgba(10,156,237,0.4)] blur-[200px]" />

      <div className="w-full flex md:flex-row flex-col justify-between items-center pb-8 gap-4">
        <Text
          variant="display-lg"
          className="md:w-[40vw] w-full z-10 md:text-start text-center"
        >
          {t("title")}
        </Text>
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
