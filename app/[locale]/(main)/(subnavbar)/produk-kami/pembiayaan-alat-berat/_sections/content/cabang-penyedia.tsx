"use client";

import CabangKamiMap from "@/components/cabang-map";
import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import { MapMarkerProps } from "@/types";
import { Locale, useTranslations } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";
import { CabangCard } from "../../../../_components/branch-card";

type Props = {
  l: Locale;
};

export default function CabangPenyediaTabs({ l }: Props) {
  const t = useTranslations("OurProduct.heLoan.cabangPenyedia");
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
  const [_, setFilter] = useQueryStates({
    area: parseAsString.withDefault(""),
  });

  const { data: dataCabang, isLoading: isLoadingCabang } =
    api.main.branches.type.useQuery("HE");

  if (!dataCabang) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const locationsData: MapMarkerProps[] = dataCabang
    .data!.filter((branch) => branch.lat && branch.long)
    .map((branch) => ({
      id: branch.id,
      name: branch.name![l] as string,
      lng: Number(branch.long),
      lat: Number(branch.lat),
    }));

  const displayedLocations = selectedBranchId
    ? locationsData.filter((loc) => loc.id === selectedBranchId)
    : locationsData;

  return (
    <section className="relative w-full py-3 flex flex-col overflow-hidden z-10">
      <Text variant="display-md">{t("title")}</Text>
      {isLoadingCabang ? (
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
                setFilter({ area: "" });
              }}
              className="absolute top-4 left-4 z-10 bg-white text-[#007bc7] hover:bg-gray-100 p-5"
            >
              {t("viewAllBranches")}
            </Button>
          )}
        </div>
      )}

      <div className="w-full h-[600px] py-5 border rounded-lg p-5 overflow-y-auto overflow-x-visible relative">
        <div className="w-full grid grid-cols-3 gap-3">
          {isLoadingCabang
            ? [1, 2, 3].map((e) => (
                <Skeleton key={e.toString()} className="w-40 h-30" />
              ))
            : dataCabang.data.map((e) => (
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
                  }}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
