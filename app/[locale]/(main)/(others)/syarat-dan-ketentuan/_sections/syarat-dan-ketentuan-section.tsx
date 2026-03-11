"use client";

import { TextHTML } from "@/components/html/text-html";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import { Locale } from "next-intl";

type Props = {
  l: Locale;
};

export default function SyaratDanKetentuanSection({ l }: Props) {
  const { data, isLoading } = api.main.law.syaratDanKetentuan.useQuery();

  return (
    <section className="main-padding-x overflow-hidden py-5">
      {isLoading ? (
        <div className="min-h-screen w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <TextHTML
          variant="body-md-regular"
          html={data?.data.content?.[l] ?? ""}
        />
      )}
    </section>
  );
}
