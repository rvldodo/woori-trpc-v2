"use client";

import { NEW_PATHS, PATHS } from "@/app/urls";
import { Text } from "@/components/html/text";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Locale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  l: Locale;
};

export default function TabsNavbar({ l }: Props) {
  const path = usePathname();
  const { data, isLoading } = api.main.menus.subTabs.useQuery({ subMenuId: 6 });

  return (
    <nav className={cn("py-0 w-full flex border-b z-50 shadow-md")}>
      <div className="w-full overflow-x-auto no-scrollbar">
        <header className="flex w-full min-w-max">
          {isLoading || !data ? (
            <div className="flex items-center gap-3 px-5">
              <Skeleton className="w-12 h-4" />
            </div>
          ) : (
            data.data.map((e) => {
              const isActive =
                path ===
                `/${l}${PATHS.korporasi.tentangKami}/${e.tabs!["id"].toLowerCase().split(" ").join("-")}`;
              return (
                <Link
                  key={e.id}
                  href={NEW_PATHS[e.tabs!["id"].split(" ").join("")] || "/"}
                  className="flex-1 text-[#434343] text-center cursor-pointer whitespace-nowrap"
                >
                  <div
                    className={`flex items-center justify-center px-6 py-4 border-b-2 ${
                      isActive ? "border-[#007BC7]" : "border-transparent"
                    } transition-all duration-100 ease-in-out`}
                  >
                    <Text variant="body-md-medium">{e.tabs![l]}</Text>
                  </div>
                </Link>
              );
            })
          )}
        </header>
      </div>
    </nav>
  );
}
