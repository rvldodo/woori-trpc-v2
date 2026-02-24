"use client";
import { Text } from "@/components/html/text";
import { cn } from "@/lib/utils";
import { Locale } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import React from "react";

type Props = {
  children: React.ReactNode;
  l: Locale;
  activeTab: string;
};

const tabsTrigger = [2024, 2023, 2022];

export default function TabsNavbar({ l, children, activeTab }: Props) {
  const [filter, setFilter] = useQueryStates(
    {
      tanggung_jawab_sosial: parseAsString.withDefault(activeTab),
    },
    { shallow: false },
  );

  return (
    <article className="flex flex-col gap-3">
      <nav
        className={cn(
          "sticky top-[114px] bg-background-primary py-0 w-full flex border-b z-50",
        )}
      >
        <div className="w-full overflow-x-auto no-scrollbar">
          <header className="flex w-full min-w-max">
            {tabsTrigger.map((e, idx) => {
              const isActive = filter.tanggung_jawab_sosial === e.toString();
              return (
                <button
                  key={idx.toString()}
                  type="button"
                  onClick={() =>
                    setFilter({ tanggung_jawab_sosial: e.toString() })
                  }
                  className="flex-1 text-[#434343] text-center cursor-pointer whitespace-nowrap"
                >
                  <div
                    className={`flex items-center justify-center px-6 py-4 border-b-2 ${
                      isActive ? "border-[#007BC7]" : "border-transparent"
                    } transition-all duration-100 ease-in-out`}
                  >
                    <Text variant="body-md-medium">{e}</Text>
                  </div>
                </button>
              );
            })}
          </header>
        </div>
      </nav>
      {children}
    </article>
  );
}
