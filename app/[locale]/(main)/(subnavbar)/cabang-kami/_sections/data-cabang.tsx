"use client";

import CabangKamiMap from "@/components/cabang-map";
import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import { MapMarkerProps } from "@/types";
import { useDebounce } from "@uidotdev/usehooks";
import { Filter, Search, X } from "lucide-react";
import { Locale, useTranslations } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";
import { CabangCard } from "../../_components/branch-card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  l: Locale;
};

export default function DataCabangSection({ l }: Props) {
  const t = useTranslations("OurBranch.dataCabangSection");
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [filter, setFilter] = useQueryStates({
    key: parseAsString.withDefault(""),
    area: parseAsString.withDefault(""),
  });

  const [filterCategory, setFilterCategory] = useQueryStates({
    filterKey: parseAsString.withDefault(""),
  });

  const debounce = useDebounce(filter, 1000);
  const debounceCategory = useDebounce(filterCategory, 1000);

  const { data: dataBranch, isLoading: isLoadingBranches } =
    api.main.branches.list.useQuery(
      {
        ...debounce,
      },
      {
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      },
    );

  const { data: categoriesData, isLoading: isLoadingCategories } =
    api.main.branches.provinces.useQuery(debounceCategory, {
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

  if (!dataBranch) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const locationsData: MapMarkerProps[] = dataBranch
    .data!.filter((branch) => branch.lat && branch.long)
    .map((branch) => ({
      id: branch.id,
      name: branch.name![l] as string,
      lng: Number(branch.long),
      lat: Number(branch.lat),
    }));

  // Filter locations based on selected branch
  const displayedLocations = selectedBranchId
    ? locationsData.filter((loc) => loc.id === selectedBranchId)
    : locationsData;

  // Find selected category name for display
  const selectedCategoryName =
    filter.area && categoriesData?.data
      ? categoriesData.data.find((cat) => cat.id.toString() === filter.area)
          ?.provinces
      : null;

  return (
    <section className="main-padding-x flex flex-col justify-start items-center gap-3">
      <div className="relative w-full md:flex hidden pb-5 items-center justify-center">
        <Text
          variant="display-lg"
          className="py-3 md:w-[35vw] text-center leading-[30px]"
        >
          {t("title")}
        </Text>
      </div>

      {isLoadingBranches ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="relative w-full h-auto">
          <CabangKamiMap
            locations={displayedLocations}
            zoom={selectedBranchId ? 15 : 4}
          />
          {selectedBranchId && (
            <Button
              onClick={() => {
                setSelectedBranchId(null);
                setFilter({ key: "", area: "" });
              }}
              className="absolute top-4 left-4 z-10 bg-white text-[#007bc7] hover:bg-gray-100 p-5"
            >
              {t("viewAllBranches")}
            </Button>
          )}
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex justify-between items-center w-full shadow-md bg-white rounded-lg z-10">
        <div className="flex items-center gap-3 w-full px-3">
          <Search className="w-5 h-5" />
          <Input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="bg-[#ffffff] p-3 border-none w-full focus-visible:ring-0"
            onChange={(e) => setFilter({ key: e.target.value })}
            value={filter.key}
          />
        </div>
        <div className="flex justify-end items-center pr-4">
          {selectedCategoryName ? (
            <div className="flex gap-3 items-center">
              <Button
                variant="woori"
                className="p-5 flex gap-3 items-center my-2"
              >
                {selectedCategoryName}
              </Button>
              <X className="w-5 h-5" onClick={() => setFilter({ area: "" })} />
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="p-4 rounded-lgflex gap-3 items-center justify-center my-2 bg-transparent border-[1px] border-[#007bc7] text-[#007bc7] hover:border-[#005e99] hover:text-[#005e99] hover:bg-transparent px-5"
                >
                  {t("filter")}
                  <Filter className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-3 w-80 bg-[#ffffff] flex flex-col gap-3"
                align="end"
              >
                <div className="flex items-center px-3 w-full bg-[#E7E7E7] rounded-lg">
                  <Search className="w-5 h-5" />
                  <Input
                    type="text"
                    placeholder={t("search")}
                    className="bg-transparent border-none w-full focus-visible:ring-0 shadow-none"
                    onChange={(e) =>
                      setFilterCategory({ filterKey: e.target.value })
                    }
                    value={filterCategory.filterKey}
                  />
                </div>
                <div className="flex justify-between pb-2">
                  <Text variant="caption-md-semi">{t("filter")}</Text>
                  <Text
                    variant="caption-md-semi"
                    className="text-[#007BC7] cursor-pointer hover:underline"
                    onClick={() => {
                      setFilterCategory({ filterKey: "" });
                    }}
                  >
                    {t("clear")}
                  </Text>
                </div>
                <Separator />
                <div className="w-full h-[30vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#7d7c7c] scrollbar-track-gray-200">
                  {isLoadingCategories ? (
                    <div className="w-full h-full flex justify-center items-center">
                      <Spinner />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 w-full">
                      {categoriesData?.data.map((category) => (
                        <div key={category.id}>
                          <Button
                            variant="ghost"
                            className="hover:bg-[#C2E8FF] w-full h-full p-3 justify-start"
                            onClick={() => {
                              setFilter({ area: category.id.toString() });
                            }}
                            type="button"
                          >
                            {category.provinces}
                          </Button>
                        </div>
                      ))}
                      {!categoriesData?.data.length && (
                        <Text
                          variant="caption-md-semi"
                          className="p-3 text-center text-gray-500"
                        >
                          {t("noCategoriesFound")}
                        </Text>
                      )}
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      <ScrollArea className="w-full h-[600px] py-5 border rounded-lg p-5">
        <div className="w-full grid grid-cols-3 gap-3">
          {isLoadingBranches
            ? [1, 2, 3].map((e) => (
                <Skeleton key={e.toString()} className="w-40 h-30" />
              ))
            : dataBranch.data.map((e) => (
                <CabangCard
                  key={e.id.toString()}
                  title={e.name![l]}
                  location={e.address!}
                  phone_number={e.phoneNumber!}
                  lat={e.lat!}
                  long={e.long!}
                  image={e.imageUrl!}
                  click={() => {
                    setSelectedBranchId(e.id!);
                    setFilter({ key: e.name![l] });
                  }}
                />
              ))}
        </div>
      </ScrollArea>
    </section>
  );
}
