"use client";

import { Locale, useTranslations } from "next-intl";
import Progressbar from "../_components/progress-bar";
import { Text } from "@/components/html/text";
import { parseAsString, useQueryStates } from "nuqs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import usedHEIcon from "@/public/assets/icons/used_he.png";
import newHEIcon from "@/public/assets/icons/new_he.png";
import UsedHEForm from "../../_components/form/used-he";
import NewHEForm from "../../_components/form/new-he";

type Props = {
  l: Locale;
};

export default function AlatBeratSection({ l }: Props) {
  const t = useTranslations("SimulatorHE");

  const [filter, setFilter] = useQueryStates({
    loan_type: parseAsString.withDefault("alat-berat-bekas"),
  });

  return (
    <article className="py-8 w-full flex justify-center items-center flex-col gap-5 main-padding-x">
      <Progressbar />

      <div className="w-full flex flex-col justify-center items-center">
        <Text variant="display-md">{t("title")}</Text>
        <Text as="div" variant="body-md-regular" className="text-center">
          {t.rich("subtitle", {
            br: (val) => (
              <div className="flex justify-center items-center text-center p-0 m-0">
                <br className="p-0" />
                {val}
              </div>
            ),
          })}
        </Text>
      </div>

      <Tabs
        defaultValue={filter.loan_type}
        className="w-full"
        onValueChange={(val) => setFilter({ loan_type: val })}
      >
        <div className="flex flex-col md:px-20">
          <Card className="h-auto md:px-[24px] px-[12px] shadow-xl w-full bg-[#ffffff] pt-12">
            <CardContent>
              <TabsList className="flex gap-3 justify-evenly h-[12vh] bg-transparent w-max min-w-full">
                <TabsTrigger
                  value="alat-berat-bekas"
                  className="w-full flex flex-col data-[state=active]:shadow-md data-[state=active]:hover:shadow-lg data-[state=active]:transition-shadow data-[state=active]:border-[1px] data-[state=active]:border-[#007BC7] data-[state=active]:rounded-md h-auto"
                >
                  <div className="w-32 h-auto flex flex-col items-center justify-center relative">
                    <Image
                      alt="icon"
                      src={usedHEIcon}
                      width={80}
                      className="absolute -top-10"
                    />
                    <Text
                      variant="body-md-semi"
                      className="pt-8 pb-2 data-[state=active]:text-[#007BC7]"
                    >
                      {t("trigger.usedHE")}
                    </Text>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="alat-berat-baru"
                  className="w-full flex flex-col data-[state=active]:shadow-md data-[state=active]:hover:shadow-lg data-[state=active]:transition-shadow data-[state=active]:border-[1px] data-[state=active]:border-[#007BC7] data-[state=active]:rounded-md h-auto"
                >
                  <div className="w-32 h-14 flex flex-col items-center justify-center relative">
                    <Image
                      alt="icon"
                      src={newHEIcon}
                      width={80}
                      className="absolute -top-10"
                    />
                    <Text
                      variant="body-md-semi"
                      className="pt-8 pb-2 data-[state=active]:text-[#007BC7]"
                    >
                      {t("trigger.newHE")}
                    </Text>
                  </div>
                </TabsTrigger>
              </TabsList>
              <div className="w-full h-full">
                <TabsContent
                  value="alat-berat-bekas"
                  className="flex flex-col gap-6"
                >
                  <UsedHEForm l={l} />
                </TabsContent>
                <TabsContent
                  value="alat-berat-baru"
                  className="flex flex-col gap-6"
                >
                  <NewHEForm l={l} />
                </TabsContent>
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </article>
  );
}
