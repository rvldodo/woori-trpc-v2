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
import {
  LOAN_DATA_HE_LOCAL_STORAGE,
  LOAN_DATA_LOCAL_STORAGE,
} from "@/lib/constants";
import { Menu, X } from "lucide-react";
import { useMobileMenu } from "@/context/mobil-menu-context";

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const { open, toggle } = useMobileMenu();

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
    localStorage.removeItem(LOAN_DATA_LOCAL_STORAGE);
    localStorage.removeItem(LOAN_DATA_HE_LOCAL_STORAGE);
    router.push("/");
  };

  const { data, isLoading } = api.main.menus.mainMenu.useQuery();

  return (
    <nav
      className={cn(
        "main-padding-x md:py-0 py-3 w-full flex md:flex-row flex-col justify-between items-center sticky top-0 border-b bg-white z-50 shadow-md gap-3",
      )}
    >
      <header className="items-center justify-start w-full h-full md:px-5 gap-5 flex">
        <div className="flex gap-2 items-center w-full md:w-auto">
          {!open ? (
            <Menu className="w-6 h-6 md:hidden flex" onClick={toggle} />
          ) : (
            <X className="w-6 h-6 md:hidden flex" onClick={toggle} />
          )}

          <Image
            src={logo}
            alt="logo"
            onClick={handleClickImage}
            className="cursor-pointer w-32 md:w-full"
          />
        </div>

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
                menuId === undefined
                  ? // Individu: active when not on korporat or pengadaan
                    activeTab?.toLowerCase() !== "korporat" &&
                    activeTab?.toLowerCase() !== "pengadaan"
                  : // Other menus: ONLY active when path matches their own menuId
                    activeTab?.toLowerCase() === menuId.toLowerCase();

              return (
                <Link
                  key={e.id}
                  href={NEW_PATHS[e.header!["id"]] || "/"}
                  className="md:flex hidden text-[#434343] text-center cursor-pointer h-full"
                  onClick={() => setActiveTab(e.header?.["id"])}
                >
                  <div
                    className={`flex items-center px-4 py-4 border-b-2 ${
                      isActive ? "border-[#007BC7]" : "border-transparent"
                    } transition-all duration-100 ease-in-out`}
                  >
                    <Text variant="body-md-medium">{e.header?.[locale]}</Text>
                  </div>
                </Link>
              );
            })
        )}

        <div className="flex w-full md:hidden items-center justify-end gap-3">
          <LangSwitcher />
          <Button variant="woori" className="hidden md:flex">
            Download MyCredit WFI
          </Button>
        </div>
      </header>
      <div className="md:flex hidden items-center gap-3">
        <LangSwitcher />
        <Button variant="woori" className="hidden md:flex">
          Download MyCredit WFI
        </Button>
      </div>

      <div className="md:hidden flex">
        {isLoading || !data ? (
          <div className="flex items-center gap-3">
            <Skeleton className="w-12" />
          </div>
        ) : (
          open &&
          data.data
            .filter((e) => e.header !== null)
            .map((e) => {
              const menuId =
                e.header!["id"] === "Individu" ? undefined : e.header!["id"];
              const isActive =
                menuId === undefined
                  ? // Individu: active when not on korporat or pengadaan
                    activeTab?.toLowerCase() !== "korporat" &&
                    activeTab?.toLowerCase() !== "pengadaan"
                  : // Other menus: ONLY active when path matches their own menuId
                    activeTab?.toLowerCase() === menuId.toLowerCase();

              return (
                <Link
                  key={e.id}
                  href={NEW_PATHS[e.header!["id"]] || "/"}
                  className="md:hidden flex text-[#434343] text-center cursor-pointer h-full"
                  onClick={() => setActiveTab(e.header?.["id"])}
                >
                  <div
                    className={`flex items-center px-4 py-4 border-b-2 ${
                      isActive ? "border-[#007BC7]" : "border-transparent"
                    } transition-all duration-100 ease-in-out`}
                  >
                    <Text variant="body-md-medium">{e.header?.[locale]}</Text>
                  </div>
                </Link>
              );
            })
        )}
      </div>

      {open && (
        <Button variant="woori" className="flex md:hidden w-full">
          Download MyCredit WFI
        </Button>
      )}
    </nav>
  );
}
