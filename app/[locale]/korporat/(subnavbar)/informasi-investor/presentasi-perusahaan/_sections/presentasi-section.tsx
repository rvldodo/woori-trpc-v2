"use client";

import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { dateFormat } from "@/lib/formatter";
import { api } from "@/trpc/react";
import { useDebounce } from "@uidotdev/usehooks";
import { File, Search } from "lucide-react";
import type { Locale } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";

type Props = {
  l: Locale;
};

export default function PresentasiPerusahaanSection({ l }: Props) {
  const [filter, setFilter] = useQueryStates({
    category: parseAsString.withDefault(""),
    key: parseAsString.withDefault(""),
  });

  const debounce = useDebounce(filter, 1000);

  const { data: categories, isLoading: categoriesLoading } =
    api.main.aboutUs.template6Category.useQuery({
      id: 15,
    });

  const { data, isLoading } =
    api.main.aboutUs.presentasiPerusahaan.useQuery(debounce);

  return (
    <article className="main-padding-x grid grid-cols-6 gap-5 py-8">
      <section className="col-span-2 flex flex-col gap-3">
        <div className="w-full flex bg-white items-center py-1 px-3 border rounded-lg">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            className="border-none"
            placeholder="Search document"
            value={filter.key}
            onChange={(e) => setFilter({ key: e.target.value })}
          />
        </div>
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
          data?.data.map((e) => (
            <a
              key={e.id}
              href={e.fileUrl || "/"}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2"
            >
              <Card>
                <CardContent className="bg-white border-none flex gap-4 w-full items-center">
                  <File className="w-6 h-6" />
                  <div className="w-full flex flex-col">
                    <Text variant="body-lg-medium">{e.title?.[l]}</Text>
                    <Text variant="body-md-regular" className="text-[#007bc7]">
                      Diperbarui pada {dateFormat(e.createdTime)}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))
        )}
      </ScrollArea>
    </article>
  );
}
