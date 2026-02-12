"use client";

import { PATHS } from "@/app/urls";
import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/trpc/react";
import { Locale, useTranslations } from "next-intl";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

type Props = {
  l: Locale;
};

export default function VisiMisiSection({ l }: Props) {
  const t = useTranslations("VisiMisi");
  const { data: visiMisi, isLoading: loadingVisiMisi } =
    api.main.visiMisi.list.useQuery();

  return (
    <section className="main-padding-x md:px-30 py-8 flex flex-col gap-3 items-center justify-center">
      {loadingVisiMisi || !visiMisi ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <Text variant="display-lg" className="md:text-start text-center">
            {t("title")}
          </Text>
          <Text
            variant="body-lg-regular"
            className="md:w-[40vw] w-full text-center"
          >
            {t("description")}
          </Text>
          <Button variant="woori" className="p-5">
            <Link href={PATHS.korporasi.laporanKeuangan}>
              {t("seeAnnualReport")}
            </Link>
          </Button>
          <Tabs
            defaultValue={visiMisi.data[0].type![l].toLowerCase()}
            className="w-full pt-10 md:px-30"
          >
            <TabsList className="w-full bg-transparent bg-none px-10 flex justify-between border-b-[1.5px] h-[55px] rounded-none">
              {visiMisi.data.map((e) => (
                <TabsTrigger
                  key={e.id.toString()}
                  value={e.type![l].toLowerCase()}
                  className="w-[20vw] text-[#2D2D2D] bg-none data-active:border-b-primary data-active:rounded-none data-active:bg-transparent data-active:bg-none data-active:shadow-none data-active:outline-none"
                >
                  <Text variant="body-lg-medium">{e.type![l]}</Text>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="p-2 w-full">
              {visiMisi?.data.map((e) => (
                <TabsContent value={e.type![l].toLowerCase()} key={e.id}>
                  <div className="flex md:flex-row flex-col items-center justify-center w-full gap-3">
                    <Text variant="display-md">{e.type![l]}</Text>
                    <Text
                      variant="body-md-medium"
                      className="md:text-start text-center"
                    >
                      {e.content![l]}
                    </Text>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </Fragment>
      )}
    </section>
  );
}
