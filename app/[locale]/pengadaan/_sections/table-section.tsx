"use client";

import { Text } from "@/components/html/text";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { PAGINATION_LIMIT } from "@/lib/constants";
import { Filter, Link as LinkIcon, Search } from "lucide-react";
import type { Locale } from "next-intl";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useTranslations } from "use-intl";
import { useDebounce } from "@uidotdev/usehooks";
import { api } from "@/trpc/react";
import type { ColumnDef } from "@tanstack/react-table";
import type { FilterParams, ProcurementType } from "@/types";
import { Button } from "@/components/ui/button";
import { dateFormat, toURLCase } from "@/lib/formatter";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PATHS } from "@/app/urls";

type Props = {
  l: Locale;
};

export default function TableSection({ l }: Props) {
  const t = useTranslations("Procurement");

  const [filter, setFilter] = useQueryStates({
    key: parseAsString.withDefault(""),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(PAGINATION_LIMIT),
  });

  const onChangeFilter = (
    name: keyof FilterParams,
    value: FilterParams[keyof FilterParams],
  ) => {
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const debounce = useDebounce(filter, 1000);

  const { data, isLoading } = api.main.procurements.list.useQuery(debounce);

  const columns: ColumnDef<ProcurementType>[] = [
    {
      header: t("table.head1"),
      accessorKey: "id",
    },
    {
      header: t("table.head2"),
      accessorKey: "title",
      cell: ({ row }) => row?.original.title?.[l],
    },
    {
      header: t("table.head3"),
      accessorKey: "category",
      cell: ({ row }) => (
        <Badge variant="outline" className="p-4 rounded-lg">
          <Text variant="body-sm-regular" color="primary">
            {row?.original.category?.[l]}
          </Text>
        </Badge>
      ),
    },
    {
      header: t("table.head4"),
      accessorKey: "deadlineDate",
      cell: ({ row }) =>
        dateFormat(new Date(row.original.deadlineDate!).toISOString()),
    },
    {
      header: t("table.head5"),
      accessorKey: "detail",
      cell: ({ row }) => (
        <Link
          href={`${PATHS.pengadaan}/${toURLCase(row.original.title?.[l] ?? "")}`}
          className="w-full h-full flex justify-center items-center"
        >
          <Button className="flex items-center gap-2">
            {t("table.head5-text")}
            <LinkIcon className="w-5 h-5 text-white" />
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <section className="main-padding-x flex md:flex-col flex-col gap-6 py-8">
      <div className="md:flex hidden justify-between w-full bg-white rounded-lg z-10 overflow-hidden relative shadow-md">
        <div className="w-full flex items-center px-5">
          <Search className="w-5 h-5" />
          <Input
            type="text"
            placeholder={t("search")}
            className="bg-[#ffffff]  p-5 border-none w-full shadow-none h-12 w-full"
            value={filter.key}
            onChange={(e) => setFilter({ key: e.target.value })}
          />
        </div>
        <div className="flex justify-end items-center pr-4">
          <Popover>
            <PopoverTrigger className="text-[#007BC7] border-[1px] border-[#007BC7] h-[2rem] px-3 rounded-lg">
              <div className="flex gap-1 justify-center items-center">
                <Text variant="body-sm-regular">Filter</Text>
                <Filter className="w-4 h-4" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-3 w-full right-20 bg-[#ffffff] flex flex-col gap-3">
              <div className="flex items-center w-full bg-white rounded-lg border px-2">
                <Search className="w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  className="bg-white border-none w-full shadow-none"
                />
              </div>
              <div className="flex justify-between pb-2">
                <Text variant="caption-md-regular">Filter</Text>
                <Text
                  variant="caption-md-regular"
                  className="text-[#007BC7] cursor-pointer"
                >
                  Clear
                </Text>
              </div>
              <Separator />
              <div className="w-full h-[30vh] overflow-y-auto scrollbar-thin scrollbar-[#7d7c7c] scrollbar-track-gray-200"></div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {isLoading || !data ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data?.data || []}
          pagination={{
            page: filter.page,
            limit: filter.limit,
            onLimitChange: (limit) => onChangeFilter("limit", limit),
            onPageChange: (page) => onChangeFilter("page", page),
            totalPages: data?.pagination?.total_pages || 0,
            totalItems: data?.pagination?.total_items || 0,
          }}
        />
      )}
    </section>
  );
}
