// components/subnavbar-popover.tsx
"use client";

import { NEW_PATHS } from "@/app/urls";
import { Text } from "@/components/html/text";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Lang, SubnavbarProps, Locale } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  item: SubnavbarProps;
  locale: Locale;
};

export function SubnavbarPopover({ item, locale }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="cursor-pointer flex gap-3 justify-center items-center hover:bg-gray-100 p-2 rounded-lg">
        <Text
          variant="body-md-regular"
          className="text-[#434343] flex gap-3 items-center"
        >
          {item.subnavbar[locale]}
          <ChevronRight
            className={`h-5 w-5 transition-transform duration-200 ${
              open ? "rotate-90" : ""
            }`}
          />
        </Text>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col bg-background p-0 gap-0">
        {item.subNavbarTabs.map((t, id) => {
          console.log(t.tabs["id" as Lang].split(" ").join(""), " ====== ");
          return (
            <Link
              key={id.toString()}
              href={NEW_PATHS[t.tabs["id" as Lang].split(" ").join("")] || "/"}
              onClick={() => setOpen(false)}
            >
              <Text
                variant="body-md-regular"
                className="cursor-pointer hover:bg-[#dbf1ff] p-2 flex items-center rounded-lg"
              >
                {t.tabs[locale]}
              </Text>
            </Link>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
