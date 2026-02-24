"use client";

import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import { useDebounce } from "@uidotdev/usehooks";
import { Locale } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import { PromoCard } from "../../../_components/promo-card";

type Props = {
  l: Locale;
};

export default function PromoSection({ l }: Props) {
  const [filter, setFilter] = useQueryStates({
    promo_order: parseAsString.withDefault(""),
  });

  const debounce = useDebounce(filter, 1000);

  const { data, isLoading } = api.main.promos.list.useQuery(debounce);

  return (
    <article className="main-padding-x flex flex-col gap-3 py-8 relative overflow-hidden">
      <section className="flex flex-col gap-3 items-center justify-center">
        <Text variant="display-xl">Promosi untuk Anda</Text>
        <div className="flex gap-3">
          <Button
            variant={filter.promo_order === "" ? "default" : "outline"}
            onClick={() => setFilter({ promo_order: "" })}
          >
            Promosi Terbaru
          </Button>
          <Button
            variant={filter.promo_order === "lama" ? "default" : "outline"}
            onClick={() => setFilter({ promo_order: "lama" })}
          >
            Promosi Lama
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          data?.data.map((e) => (
            <PromoCard key={e.id.toString()} l={l} slug={e.title?.[l] ?? ""} />
          ))
        )}
      </section>
    </article>
  );
}
