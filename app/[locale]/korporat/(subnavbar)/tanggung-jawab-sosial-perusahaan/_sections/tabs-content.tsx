"use client";

import { PATHS } from "@/app/urls";
import Img from "@/components/html/img";
import { Text } from "@/components/html/text";
import { TextHTML } from "@/components/html/text-html";
import { Spinner } from "@/components/ui/spinner";
import { createExcerpt, toURLCase } from "@/lib/formatter";
import { api } from "@/trpc/react";
import { ArrowRight } from "lucide-react";
import { Locale } from "next-intl";
import { redirect } from "next/navigation";

type Props = {
  l: Locale;
  activeTab: string;
};

export default function TabsContentSection({ activeTab, l }: Props) {
  const { data, isLoading } = api.main.template7.listBySubnavbarId.useQuery(
    { subnavbarId: 9, year: activeTab },
    { enabled: !!activeTab },
  );

  return (
    <article className="w-full main-padding-x py-8 flex flex-col gap-4 justify-center items-center">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <section className="grid grid-cols-4 gap-5 w-full">
          {data?.data.map((e) => (
            <div className="flex flex-col gap-3" key={e.id.toString()}>
              <div className="relative h-52 w-full">
                <Img
                  src={`/api/files${e.imgUrl}`}
                  alt={e.title?.[l]}
                  className="object-cover w-full h-full"
                  width={1000}
                  height={1000}
                />
              </div>
              <Text variant="body-md-semi">{e.title?.[l]}</Text>
              <Text variant="body-sm-regular" className="truncate">
                {createExcerpt(e.description?.[l] ?? "")}
              </Text>
              <Text
                variant="body-sm-medium"
                color="primary"
                className="flex items-center gap-3 hover:cursor-pointer"
                onClick={() =>
                  redirect(
                    `${PATHS.korporasi.tanggungJawabSosialPerusahaanDetail}/${toURLCase(e.title?.[l] ?? "")}`,
                  )
                }
              >
                Lebih Lanjut
                <ArrowRight className="w-4 h-4 text-primary-blue" />
              </Text>
            </div>
          ))}
        </section>
      )}
    </article>
  );
}
