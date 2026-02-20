"use client";

import { Text } from "@/components/html/text";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import { Locale } from "next-intl";

type Props = { l: Locale };

export default function LembagaDanProfesiSection({ l }: Props) {
  const { data, isLoading } =
    api.main.template3.getDataByTabsAndSubnavbarId.useQuery({
      tabId: 7,
      subnavbarId: 6,
    });

  return (
    <article className="w-full py-8 flex flex-wrap justify-evenly gap-5 items-center main-padding-x overflow-hidden">
      {isLoading || !data?.data ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        data?.data.map((e) => {
          return (
            <Card
              key={e.id}
              className="shadow-sm bg-white rounded-lg p-4 md:w-[35vw] w-full h-64 flex flex-col gap-5 justify-evenly"
            >
              <Text variant="display-sm">{e.title![l]}</Text>
              <Text variant="body-md-medium">{e.companyName![l]}</Text>
              <Text variant="body-md-regular">{e.address}</Text>
            </Card>
          );
        })
      )}
    </article>
  );
}
