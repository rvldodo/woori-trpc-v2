"use client";

import { Text } from "@/components/html/text";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Locale } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";

type Props = {
  l: Locale;
};

export default function FAQSection({ l }: Props) {
  const [filter, setFilter] = useQueryStates({
    key: parseAsString.withDefault(""),
  });

  return (
    <section className="main-padding-x py-8 flex flex-col justify-start items-center gap-3">
      <section className="flex flex-col justify-center items-center w-full gap-3">
        <Text variant="display-lg">Frequently Asked Questions</Text>
        <div className="flex items-center px-3 w-[400px] border rounded-lg bg-white">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            value={filter.key}
            onChange={(e) => setFilter({ key: e.target.value })}
            placeholder="Find what information you're looking for..."
            className="w-full border-none"
          />
        </div>
      </section>

      <section className="grid grid-cols-4 w-full">
        <div className="w-full col-span-1">Category</div>
        <div className="w-full col-span-3">Category</div>
      </section>
    </section>
  );
}
