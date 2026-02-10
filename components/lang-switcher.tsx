"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { LANGUAGE_OPTIONS } from "@/i18n/lang";
import { Text } from "./html/text";
import { cn } from "@/lib/utils";

export function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    if (isPending) return; // Prevent multiple clicks during transition

    startTransition(() => {
      const segments = pathname.split("/");
      segments[1] = newLocale;
      const newPath = segments.join("/");
      router.replace(newPath);
    });
  };

  return (
    <div className="flex items-center gap-3">
      {LANGUAGE_OPTIONS.map((e, index: number) => {
        const isActive = locale === e.lang;
        const isLastItem = index === LANGUAGE_OPTIONS.length - 1;

        return (
          <div key={e.lang} className="flex items-center gap-3">
            <Text
              variant="body-md-medium"
              className={cn(
                "text-center rounded-sm cursor-pointer hover:bg-[#dbf1ff] hover:text-primary p-2 transition-all",
                {
                  "font-semibold bg-[#dbf1ff] text-primary": isActive,
                  "opacity-50 cursor-not-allowed": isPending,
                },
              )}
              onClick={() => handleLocaleChange(e.lang)}
            >
              {e.lang.toUpperCase()}
            </Text>

            {!isLastItem && <div className="w-[2px] h-10 bg-muted" />}
          </div>
        );
      })}
    </div>
  );
}
