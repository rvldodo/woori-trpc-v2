"use client";

import { useLocale } from "next-intl";
import { LangSwitcher } from "./lang-switcher";
import { Text } from "./html/text";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { api } from "@/trpc/react";
import { NEW_PATHS } from "@/app/urls";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import Img from "./html/img";

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const locale = useLocale();

  // Use state instead of deriving from path every render
  const [activeTab, setActiveTab] = useState<string | undefined>(
    path.split("/")[2],
  );

  // Sync activeTab with path changes
  useEffect(() => {
    setActiveTab(path.split("/")[2]);
  }, [path]);

  const handleClickImage = () => {
    setActiveTab(undefined);
    router.push("/");
  };

  const { data, isLoading } = api.main.menus.mainMenu.useQuery();

  return (
    <nav
      className={cn(
        "main-padding-x py-0 w-full flex justify-between items-center sticky top-0 border-b bg-white z-50 shadow-md",
      )}
    >
      <header className="items-center w-full h-full px-5 gap-5 flex">
        <Image
          src={logo}
          alt="logo"
          onClick={handleClickImage}
          className="cursor-pointer"
        />
        {isLoading || !data ? (
          <div className="flex items-center gap-3">
            <Skeleton className="w-12" />
          </div>
        ) : (
          data.data
            .filter((e) => e.header !== null)
            .map((e) => {
              const menuId =
                e.header!["id"] === "Individu" ? undefined : e.header!["id"];
              const isActive =
                activeTab?.toLowerCase() === menuId?.toLowerCase();

              return (
                <Link
                  key={e.id}
                  href={NEW_PATHS[e.header!["id"]] || "/"}
                  className="flex text-[#434343] text-center cursor-pointer h-full"
                  onClick={() => setActiveTab(e.header!["id"])}
                >
                  <div
                    className={`flex items-center px-4 py-4 border-b-2 ${
                      isActive ? "border-[#007BC7]" : "border-transparent"
                    } transition-all duration-100 ease-in-out`}
                  >
                    <Text variant="body-lg-medium">{e.header![locale]}</Text>
                  </div>
                </Link>
              );
            })
        )}
      </header>
      <div className="flex items-center gap-3">
        <LangSwitcher />
        <Button variant="woori">Download MyCredit WFI</Button>
      </div>
    </nav>
  );
}
