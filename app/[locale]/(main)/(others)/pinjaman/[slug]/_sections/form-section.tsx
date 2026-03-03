"use client";

import NewCarForm from "@/app/[locale]/(main)/_sections/simulator/form/new-car";
import UsedCarForm from "@/app/[locale]/(main)/_sections/simulator/form/used-car";
import { Text } from "@/components/html/text";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Locale, useTranslations } from "next-intl";
import Image from "next/image";
import usedCarIcon from "@/public/assets/icons/used_car.png";
import newCarIcon from "@/public/assets/icons/new_car.png";
import Progressbar from "../../_components/progress-bar";

type Props = {
  l: Locale;
  slug: string;
};

export default function FormSectionMainPage({ l, slug }: Props) {
  const t = useTranslations("Simulator");

  return (
    <article className="py-8 w-full flex justify-center items-center flex-col gap-5 main-padding-x">
      <Progressbar />

      <div className="w-full flex flex-col justify-center items-center">
        <Text variant="display-md">{t("title")}</Text>
        <Text variant="body-md-regular">{t("subtitle")}</Text>
      </div>

      <Tabs defaultValue={slug} className="w-full">
        <div className="flex flex-col md:px-20">
          <Card className="h-auto md:px-[24px] px-[12px] shadow-xl w-full bg-[#ffffff] pt-12">
            <CardContent>
              <TabsList className="flex gap-3 justify-evenly h-[12vh] bg-transparent w-max min-w-full">
                <TabsTrigger
                  value="mobil-bekas"
                  className="w-full flex flex-col data-[state=active]:shadow-md data-[state=active]:hover:shadow-lg data-[state=active]:transition-shadow data-[state=active]:border-[1px] data-[state=active]:border-[#007BC7] data-[state=active]:rounded-md h-auto"
                >
                  <div className="w-32 h-auto flex flex-col items-center justify-center relative">
                    <Image
                      alt="icon"
                      src={usedCarIcon}
                      width={100}
                      className="absolute -top-10"
                    />
                    <Text
                      variant="body-md-semi"
                      className="pt-8 pb-2 data-[state=active]:text-[#007BC7]"
                    >
                      {t("trigger.usedCar")}
                    </Text>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="mobil-baru"
                  className="w-full flex flex-col data-[state=active]:shadow-md data-[state=active]:hover:shadow-lg data-[state=active]:transition-shadow data-[state=active]:border-[1px] data-[state=active]:border-[#007BC7] data-[state=active]:rounded-md h-auto"
                >
                  <div className="w-32 h-14 flex flex-col items-center justify-center relative">
                    <Image
                      alt="icon"
                      src={newCarIcon}
                      width={100}
                      className="absolute -top-10"
                    />
                    <Text
                      variant="body-md-semi"
                      className="pt-8 pb-2 data-[state=active]:text-[#007BC7]"
                    >
                      {t("trigger.newCar")}
                    </Text>
                  </div>
                </TabsTrigger>
              </TabsList>
              <div className="w-full h-full">
                <TabsContent
                  value="mobil-bekas"
                  className="flex flex-col gap-6"
                >
                  <UsedCarForm l={l} />
                </TabsContent>
                <TabsContent value="mobil-baru" className="flex flex-col gap-6">
                  <NewCarForm l={l} />
                </TabsContent>
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </article>
  );
}
