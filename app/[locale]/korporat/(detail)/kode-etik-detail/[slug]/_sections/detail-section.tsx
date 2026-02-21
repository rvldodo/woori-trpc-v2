"use client";

import { PATHS } from "@/app/urls";
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
import { dateFormat, hyphenToPascalCase } from "@/lib/formatter";
import { api } from "@/trpc/react";
import { Locale } from "next-intl";
import { redirect } from "next/navigation";

type Props = {
  l: Locale;
  slug: string;
};

export default function KodeEtikDetailSection({ l, slug }: Props) {
  const { data, isLoading } = api.main.template6.template6DataByTitle.useQuery(
    {
      title: slug,
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
                  onClick={() => redirect(PATHS.korporasi.kodeEtik)}
                >
                  <Text variant="caption-md-regular">Kode Etik</Text>
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
              <Text variant="display-md">{data?.data.title?.[l]}</Text>
              <Text variant="caption-md-regular">
                Diperbaru pada {dateFormat(data?.data.createdTime ?? "")}
              </Text>
            </div>
            <TextHTML
              variant="body-md-regular"
              html={data?.data.content?.[l] ?? ""}
            />
          </div>
        </section>
      )}
    </article>
  );
}
