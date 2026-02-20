"use client";

import Img from "@/components/html/img";
import { Text } from "@/components/html/text";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { Locale } from "next-intl";

type Props = { l: Locale };

export default function PenghargaanSection({ l }: Props) {
  const { data, isLoading } = api.main.aboutUs.penghargaan.useQuery();

  return (
    <article className="w-full wrapper py-8 flex flex-col gap-4 justify-center items-center">
      {isLoading ? (
        <div className="grid grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i.toString()} className="w-full flex flex-col gap-8">
              <Skeleton className="size-96 bg-gray-200 animate-pulse rounded" />
              <Skeleton className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
            </div>
          ))}
        </div>
      ) : (
        <section className="grid grid-cols-3 gap-5 items-start">
          {data?.data.map((e) => (
            <div
              className="w-full flex flex-col gap-3 items-center justify-center"
              key={e.id}
            >
              {e.imgUrl && (
                <Img
                  src={`/api/files${e.imgUrl}`}
                  alt={`Penghargaan ${e.title?.[l]}`}
                  className="size-96 object-cover rounded-lg"
                  width={250}
                  height={250}
                />
              )}
              <Text variant="body-md-regular" className="text-center">
                {e.title?.[l] ?? ""}
              </Text>
            </div>
          ))}
        </section>
      )}
    </article>
  );
}
