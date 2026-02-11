"use client";

import { Text } from "@/components/html/text";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import { useTranslations, type Locale } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import { AccordionTabs } from "../../../_components/accordion-tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  l: Locale;
};

export default function FAQSection({ l }: Props) {
  const t = useTranslations("FAQ");

  const [filter, setFilter] = useQueryStates({
    key: parseAsString.withDefault(""),
    category: parseAsString.withDefault(""),
  });

  const debounce = useDebounce(filter, 1000);

  const { data, isLoading } = api.main.faqs.list.useQuery(debounce);
  const { data: category, isLoading: categoryLoading } =
    api.main.faqs.category.useQuery();

  return (
    <section className="main-padding-x py-8 flex flex-col justify-start items-center gap-3">
      <section className="flex flex-col justify-center items-center w-full gap-3">
        <Text variant="display-lg">{t("title")}</Text>
        <div className="flex items-center px-3 w-[700px] border py-1 rounded-lg bg-white">
          <Search className="w-5 h-5 text-gray-500" />
          <Input
            value={filter.key}
            onChange={(e) => setFilter({ key: e.target.value })}
            placeholder={t("placeholder")}
            className="w-full border-none placeholder:text-[18px]"
          />
        </div>
      </section>

      <section className="grid grid-cols-4 w-full gap-5 pt-5">
        {categoryLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="w-full col-span-1 flex flex-col gap-3">
            <Text variant="body-lg-semi">Category</Text>
            <Button
              variant={filter.category === "" ? "woori_active" : "ghost"}
              className="flex justify-start hover:bg-[#C2E8FF] hover:border hover:border-primary"
              onClick={() => setFilter({ category: "" })}
            >
              <Text variant="body-lg-regular">All</Text>
            </Button>
            {category?.data.map((e, idx: number) => (
              <Button
                variant={
                  filter.category === e.category![l] ? "woori_active" : "ghost"
                }
                key={idx.toString()}
                className="flex justify-start hover:bg-[#C2E8FF] hover:border hover:border-primary"
                onClick={() => setFilter({ category: e.category![l] })}
              >
                <Text variant="body-lg-regular">{e.category![l]}</Text>
              </Button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : data?.data.length ? (
          <ScrollArea className="w-full col-span-3 max-h-[500px] border rounded-lg p-3">
            <Accordion type="single" defaultValue="item-0">
              {data?.data.map((e, idx: number) => {
                return (
                  <div key={idx.toString()} className="w-full">
                    <AccordionTabs
                      id={idx}
                      question={e.question![l]}
                      answer={e.answer![l]}
                    />
                    <Separator className="bg-[#E7E7E7] mb-2 mt-0" />
                  </div>
                );
              })}
            </Accordion>
          </ScrollArea>
        ) : (
          <div className="col-span-3 w-full h-full flex justify-center items-center">
            <Text variant="display-lg" color="muted">
              {t("notFound")}
            </Text>
          </div>
        )}
      </section>
    </section>
  );
}
