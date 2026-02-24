"use client";

import { PATHS } from "@/app/urls";
import Img from "@/components/html/img";
import { Text } from "@/components/html/text";
import { TextHTML } from "@/components/html/text-html";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import { dateFormat, hyphenToPascalCase, toTitleCase } from "@/lib/formatter";
import { api } from "@/trpc/react";
import type { Locale } from "next-intl";
import { redirect } from "next/navigation";

type Props = {
  l: Locale;
  slug: string;
};

export default function TanggungJawabSosialDetailSection({ l, slug }: Props) {
  const { data, isLoading } = api.main.template7.detail.useQuery(
    {
      title: toTitleCase(slug),
    },
    { enabled: !!slug },
  );

  return (
    <article className="main-padding-x flex flex-col gap-5">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <section className="py-3 w-full flex flex-col gap-3">
          <Breadcrumb className="py-5">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={PATHS.home.base}>
                  <Text variant="caption-md-regular">Halaman Utama</Text>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="cursor-pointer"
                  onClick={() =>
                    redirect(PATHS.korporasi.tanggungJawabSosialPerusahaan)
                  }
                >
                  <Text variant="caption-md-regular">
                    Tanggung Jawab Sosial Perusahaan
                  </Text>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Text variant="caption-md-regular" className="text-[#007bc7]">
                    {hyphenToPascalCase(data?.data.title?.[l] ?? "")}
                  </Text>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Text variant="display-lg">{data?.data.title?.[l]}</Text>
              <Text variant="caption-md-regular">
                Diperbaru pada {dateFormat(data?.data.createdTime ?? "")}
              </Text>
            </div>
            <Img
              src={`/api/files${data?.data.imgUrl}`}
              alt={data?.data.title?.[l]}
              width={1000}
              height={1000}
              className="w-full object-cover"
            />
            <TextHTML
              variant="body-md-regular"
              html={data?.data.description?.[l] ?? ""}
            />
          </div>
        </section>
      )}
    </article>
  );
}
