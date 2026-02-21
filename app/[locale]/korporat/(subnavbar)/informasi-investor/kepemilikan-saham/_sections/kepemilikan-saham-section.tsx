"use client";

import Img from "@/components/html/img";
import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import { useDebounce } from "@uidotdev/usehooks";
import type { Locale } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";

type Props = {
  l: Locale;
};

export default function KepemilikanSahamSection({ l }: Props) {
  const [filter, setFilter] = useQueryStates({
    category: parseAsString.withDefault(""),
  });

  const debounce = useDebounce(filter, 1000);

  const { data: categories, isLoading: categoriesLoading } =
    api.main.aboutUs.template6Category.useQuery({
      id: 9,
    });

  const { data, isLoading } =
    api.main.aboutUs.kepemilikanSaham.useQuery(debounce);

  return (
    <article className="main-padding-x grid grid-cols-6 gap-5 py-8">
      <section className="col-span-2 flex flex-col gap-3">
        <Text variant="body-lg-semi">Categories</Text>
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
              All Categories
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

      <ScrollArea className="main-padding-x col-span-4 flex flex-col justify-between gap-3 max-h-125">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          data?.data.map((e, idx: number) => (
            <Img
              key={idx.toString()}
              src={`/api/files${e.fileUrl || "/"}`}
              alt="Kepemilikan Saham"
              width={2000}
              height={2000}
            />
          ))
        )}
      </ScrollArea>
    </article>
  );
}
