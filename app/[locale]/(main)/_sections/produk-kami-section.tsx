"use client";

import { Text } from "@/components/html/text";
import { api } from "@/trpc/react";
import { Locale } from "@/types";
import { ProductCard } from "../_components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { Fragment } from "react/jsx-runtime";

type Props = {
  l: Locale;
};

export default function ProductKamiSection({ l }: Props) {
  const t = useTranslations();
  const { data: products, isLoading: productLoading } =
    api.main.products.list.useQuery();

  return (
    <section className="main-padding-x flex flex-col gap-3 py-8 relative overflow-hidden">
      <div className="absolute left-[70rem] lg:w-[30vw] md:w-[20vw] aspect-square rounded-full bg-[rgba(10,156,237,0.2)] lg:filter lg:blur-[100px]" />
      <Text variant="display-lg">{t("OurProduct.title")}</Text>
      <Text variant="body-lg-medium">
        {t.rich("OurProduct.description", {
          br: (chunks) => (
            <Fragment>
              <br />
              {chunks}
            </Fragment>
          ),
        })}
      </Text>
      <div className="flex md:flex-row flex-col gap-3 z-10">
        {productLoading || !products
          ? [1, 2, 3].map((e) => <Skeleton key={e.toString()} />)
          : products.data.map((e) => {
              return (
                <ProductCard
                  key={e.id}
                  icon={`/api/files${e.iconUrl}`}
                  title={e.title![l]}
                  description={e.description![l]}
                  path={e.redirectUrl!}
                />
              );
            })}
      </div>
    </section>
  );
}
