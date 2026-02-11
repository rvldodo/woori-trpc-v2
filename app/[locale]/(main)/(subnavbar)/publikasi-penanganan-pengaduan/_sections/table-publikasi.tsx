"use client";

import { PAGINATION_LIMIT } from "@/lib/constants";
import { Link } from "lucide-react";
import type { Locale } from "next-intl";
import { parseAsInteger, useQueryStates } from "nuqs";
import { useTranslations } from "use-intl";
import { useDebounce } from "@uidotdev/usehooks";
import { api } from "@/trpc/react";
import type { ColumnDef } from "@tanstack/react-table";
import type { FilterParams } from "@/types";
import { Button } from "@/components/ui/button";
import { dateFormat } from "@/lib/formatter";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/data-table";
import { env } from "@/env.mjs";
import { publikasiPenangananDarurat } from "@/drizzle/migrations/schema";

type Props = {
  l: Locale;
};

export default function TableSection({ l }: Props) {
  const t = useTranslations("Publication");

  const [filter, setFilter] = useQueryStates({
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

  const { data, isLoading } = api.main.publications.list.useQuery(debounce);

  const columns: ColumnDef<typeof publikasiPenangananDarurat.$inferSelect>[] = [
    {
      header: t("table.head1"),
      accessorKey: "id",
    },
    {
      header: t("table.head2"),
      accessorKey: "name",
      cell: ({ row }) => row.original.name![l] ?? "-",
    },
    {
      header: t("table.head3"),
      accessorKey: "publicationDate",
      cell: ({ row }) =>
        row.original.publicationDate
          ? dateFormat(new Date(row.original.publicationDate).toString())
          : "-",
    },
    {
      header: t("table.head4"),
      accessorKey: "fileUrl",
      cell: ({ row }) => (
        <div className="w-full h-full flex justify-center items-center">
          <Button
            className="flex items-center gap-2"
            disabled={!row.original.fileUrl}
          >
            {t("table.head4-button")}
            <Link
              href={`${env.NEXT_PUBLIC_URL}${row.original.fileUrl}`}
              className="w-5 h-5 text-white"
            />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <section className="main-padding-x flex md:flex-col flex-col gap-6 py-8 z-10">
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
