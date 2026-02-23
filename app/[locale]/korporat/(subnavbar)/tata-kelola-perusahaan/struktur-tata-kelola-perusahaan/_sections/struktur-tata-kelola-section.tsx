"use client";

import { Text } from "@/components/html/text";
import { SimpleTable } from "@/components/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { dateFormat } from "@/lib/formatter";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import type { ColumnDef } from "@tanstack/react-table";
import { useDebounce } from "@uidotdev/usehooks";
import { File, Search } from "lucide-react";
import { useTranslations, type Locale } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";

type Props = {
  l: Locale;
};

type SekretarisType = {
  name: string;
  phone: string;
  fax: string;
  email: string;
  office_address: string;
};

const dataTable: SekretarisType[] = [
  {
    name: "Lisa Azizah Subagiyo",
    phone: "021 520 0434",
    fax: "021 520 09160",
    email: "lisa@woorifinance.co.id",
    office_address:
      "Gedung Plaza Chase, Lt. 16 Jl. Jend Sudirman Kav 21 Jakarta 12920 - Indonesia",
  },
];

export default function StrukturTataKelolaSection({ l }: Props) {
  const t = useTranslations("StrukturTataKelolaPerusahaa");

  const [filter, setFilter] = useQueryStates({
    category: parseAsString.withDefault(""),
    key: parseAsString.withDefault(""),
  });

  const debounce = useDebounce(filter, 1000);

  const { data: categories, isLoading: categoriesLoading } =
    api.main.template6.template6Category.useQuery({
      id: 18,
    });

  const { data, isLoading } = api.main.template6.komiteAudit.useQuery(debounce);

  const columns: ColumnDef<SekretarisType>[] = [
    {
      header: t("table_headers.name"),
      accessorKey: "name",
    },
    {
      header: t("table_headers.phone"),
      accessorKey: "phone",
    },
    {
      header: t("table_headers.fax"),
      accessorKey: "fax",
    },
    {
      header: t("table_headers.email"),
      accessorKey: "email",
    },
    {
      header: t("table_headers.office_address"),
      accessorKey: "office_address",
      cell: ({ row }) => {
        return (
          <div>
            {row?.original?.office_address
              ? row?.original?.office_address
              : "-"}
          </div>
        );
      },
    },
  ];

  return (
    <article className="main-padding-x grid grid-cols-6 gap-5 py-8">
      <section className="col-span-2 flex flex-col gap-3">
        <div className="w-full flex bg-white items-center py-1 px-3 border rounded-lg">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            className="border-none"
            placeholder={t("search_placeholder")}
            value={filter.key}
            onChange={(e) => setFilter({ key: e.target.value })}
          />
        </div>
        <Text variant="body-lg-semi">{t("category_label")}</Text>
        <Separator />
        {categoriesLoading || !categories?.data ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <Button
              onClick={() => setFilter({ category: "" })}
              variant={filter.category === "" ? "default" : "outline"} // optional active state
              className="flex justify-start"
            >
              {t("category_button")}
            </Button>
            {categories.data.map((e, idx: number) => (
              <Button
                key={idx.toString()}
                variant={filter.category === e?.[l] ? "default" : "outline"} // optional
                onClick={() => setFilter({ category: e?.[l] })}
                className="flex justify-start"
              >
                {e?.[l]}
              </Button>
            ))}
          </>
        )}
      </section>

      <ScrollArea className="main-padding-x col-span-4 flex flex-col justify-between gap-3 h-125">
        <div
          className={cn(
            filter.category === "" ? "flex" : "hidden",
            "w-full flex-col gap-3",
          )}
        >
          <Text variant="display-md">{t("company_secretary_title")}</Text>
          <Text variant="body-md-regular">
            {t("company_secretary_description")}
          </Text>
          <SimpleTable columns={columns} data={dataTable} />
        </div>

        <div
          className={cn(filter.category !== "" ? "flex" : "hidden", "w-full")}
        >
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            data?.data.map((e) => (
              <a
                key={e.id}
                href={e.fileUrl || "/"}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 w-full"
              >
                <Card>
                  <CardContent className="bg-white border-none flex gap-4 w-full items-center">
                    <File className="w-6 h-6" />
                    <div className="w-full flex flex-col">
                      <Text variant="body-lg-medium">{e.title?.[l]}</Text>
                      <Text
                        variant="body-md-regular"
                        className="text-[#007bc7]"
                      >
                        Diperbarui pada {dateFormat(e.createdTime)}
                      </Text>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))
          )}
        </div>
      </ScrollArea>
    </article>
  );
}
