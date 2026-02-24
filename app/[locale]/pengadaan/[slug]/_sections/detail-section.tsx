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
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  dateFormat,
  extractTitleFromPath,
  hyphenToPascalCase,
  toTitleCase,
} from "@/lib/formatter";
import { api } from "@/trpc/react";
import { Download } from "lucide-react";
import { Locale } from "next-intl";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  l: Locale;
  slug: string;
};

export default function PengadatanDetailSection({ l, slug }: Props) {
  const { data, isLoading } = api.main.procurements.detail.useQuery(
    { slug: toTitleCase(slug) },
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
                  onClick={() => redirect(PATHS.pengadaan)}
                >
                  <Text variant="caption-md-regular">Pengadaan</Text>
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
              html={data?.data.description?.[l] ?? ""}
            />

            <Text variant="display-md">
              File yang dibutuhkan untuk pengajuan Pengadaan
            </Text>
            <TextHTML
              variant="body-md-regular"
              html={data?.data.requirements?.[l] ?? ""}
            />

            {data?.data.files?.map((e, idx: number) => (
              <div
                className="flex justify-between items-center"
                key={idx.toString()}
              >
                <Text variant="body-md-semi">{extractTitleFromPath(e)}</Text>
                <Link href={`/api/files${e}`}>
                  <Button
                    className="flex gap-2rounded-lg bg-transparent"
                    variant="woori_white"
                  >
                    Unduh
                    <Download className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
