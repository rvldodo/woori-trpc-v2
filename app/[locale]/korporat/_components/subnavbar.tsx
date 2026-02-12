import { NEW_PATHS } from "@/app/urls";
import { SubnavbarPopover } from "@/components/html/subnavbar-popover";
import { Text } from "@/components/html/text";
import { api } from "@/trpc/server";
import type { Lang, SubnavbarProps, Locale } from "@/types";
import Link from "next/link";

type Props = { l: Locale };

export default async function Subnavbar({ l }: Props) {
  const submenus = await api.logged.main.menus.subMenu.query(2);
  const temp: SubnavbarProps[] = [];
  for (const [id, data] of Object.entries(submenus.data)) {
    temp.push(data as SubnavbarProps);
  }

  return (
    <div className="main-padding-x py-1 w-full md:flex hidden items-center sticky  top-[65px] border-b bg-white z-50 shadow-md gap-2">
      {temp.map((e: SubnavbarProps, idx: number) => {
        if (e.subNavbarTabs.length === 0) {
          return (
            <Link
              key={idx.toString()}
              href={
                NEW_PATHS[e.subnavbar["id" as Lang].split(" ").join("")] || "/"
              }
              className="flex items-center px-2 hover:bg-gray-100 rounded-lg"
            >
              <Text
                variant="body-md-medium"
                className="cursor-pointer p-2 flex text-[#434343]"
              >
                {e.subnavbar[l]}
              </Text>
            </Link>
          );
        }
        return <SubnavbarPopover key={idx.toString()} item={e} locale={l} />;
      })}
    </div>
  );
}
