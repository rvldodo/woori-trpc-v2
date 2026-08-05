"use client";

import { NEW_PATHS } from "@/app/urls";
import { SubnavbarAccordion } from "@/components/html/subnavbar-accordion";
import { SubnavbarPopover } from "@/components/html/subnavbar-popover";
import { Text } from "@/components/html/text";
import { Accordion } from "@/components/ui/accordion";
import { useMobileMenu } from "@/context/mobil-menu-context";
import { api } from "@/trpc/react";
import type { Lang, SubnavbarProps, Locale } from "@/types";
import Link from "next/link";

type Props = { l: Locale };

export default function Subnavbar({ l }: Props) {
  const { data: submenus, isLoading } = api.main.menus.subMenu.useQuery(1);
  const { open } = useMobileMenu();

  if (isLoading) return null;

  const temp = Object.values(submenus?.data || {}) as SubnavbarProps[];

  if (open) {
    return (
      <div className="main-padding-x py-1 w-full flex md:flex-row flex-col md:items-center items-start sticky md:top-[65px] top-[186px] border-b bg-white z-50 shadow-md gap-2">
        <Accordion type="single" defaultValue="0">
          {temp.map((e: SubnavbarProps, idx: number) => {
            if (e.subNavbarTabs.length === 0) {
              return (
                <Link
                  key={idx.toString()}
                  href={
                    NEW_PATHS[e.subnavbar["id" as Lang].split(" ").join("")] ||
                    "/"
                  }
                  className="flex items-center md:px-2 px-0 hover:bg-gray-100 rounded-lg"
                >
                  <Text
                    variant="body-md-regular"
                    className="cursor-pointer p-2 flex text-[#434343]"
                  >
                    {e.subnavbar[l]}
                  </Text>
                </Link>
              );
            }
            return (
              <div key={idx.toString()} className="w-full">
                <div className="md:flex hidden w-full">
                  <SubnavbarPopover item={e} locale={l} />
                </div>

                <div className="md:hidden flex w-full">
                  <SubnavbarAccordion
                    value={idx.toString()}
                    item={e}
                    locale={l}
                  />
                </div>
              </div>
            );
          })}
        </Accordion>
      </div>
    );
  }

  return (
    <div className="main-padding-x py-1 w-full md:flex hidden sticky top-[65px] border-b bg-white z-50 shadow-md gap-2">
      {temp.map((e: SubnavbarProps) => {
        if (e.subNavbarTabs.length === 0) {
          return (
            <Link
              key={e.id}
              href={
                NEW_PATHS[e.subnavbar["id" as Lang].split(" ").join("")] || "/"
              }
              className="flex items-center px-2 hover:bg-gray-100 rounded-lg"
            >
              <Text
                variant="body-md-regular"
                className="cursor-pointer p-2 flex text-[#434343]"
              >
                {e.subnavbar[l]}
              </Text>
            </Link>
          );
        }
        return (
          <div key={e.id} className="md:flex hidden">
            <SubnavbarPopover item={e} locale={l} />
          </div>
        );
      })}
    </div>
  );
}
