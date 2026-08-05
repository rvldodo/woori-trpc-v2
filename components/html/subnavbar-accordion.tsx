"use client";

import { NEW_PATHS } from "@/app/urls";
import { Text } from "@/components/html/text";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Lang, SubnavbarProps, Locale } from "@/types";
import Link from "next/link";

type Props = {
  item: SubnavbarProps;
  locale: Locale;
  value: string;
};

export function SubnavbarAccordion({ item, locale, value }: Props) {
  return (
    <AccordionItem value={value} className="border-none w-full">
      <AccordionTrigger className="hover:no-underline p-2 hover:bg-gray-100 rounded-lg w-full">
        <Text
          variant="body-md-regular"
          className="text-[#434343] flex items-center"
        >
          {item.subnavbar[locale]}
        </Text>
      </AccordionTrigger>

      <AccordionContent className="flex flex-col pl-4 [&_a]:no-underline ">
        {item.subNavbarTabs.map((t, id) => (
          <Link
            key={id.toString()}
            href={NEW_PATHS[t.tabs["id" as Lang].split(" ").join("")] || "/"}
          >
            <Text
              variant="body-md-regular"
              className="cursor-pointer hover:bg-[#dbf1ff] p-2 flex items-center rounded-lg no-underline"
            >
              {t.tabs[locale]}
            </Text>
          </Link>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
