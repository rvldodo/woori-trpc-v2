"use client";

import Link from "next/link";
import { PATHS } from "@/app/urls";
import { api } from "@/trpc/react";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/html/text";
import { dateFormat } from "@/lib/formatter";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Locale, useTranslations } from "next-intl";
import Img from "@/components/html/img";

type Props = {
  l: Locale;
  id: number | string;
};

export const PromoCard = ({ l, id }: Props) => {
  const t = useTranslations("Promo");

  const { data, isLoading } = api.main.promos.detail.useQuery({
    promoId: Number(id),
  });

  return isLoading || !data ? (
    <Skeleton className="w-25 h-15 rounded-lg" />
  ) : (
    <Card className="bg-none bg-transparent border-none shadow-none">
      <CardContent className="border-none shadow-none flex flex-col gap-3">
        <Img
          src={`/api/files${data?.data?.promos.imgUrlDesktop as string}`}
          alt="thumbnail"
          style={{
            objectFit: "cover",
            borderRadius: "12px",
          }}
          width={1000}
          height={1000}
        />
        <div className="flex flex-col gap-3">
          <Text variant="body-lg-semi" className="text-[#434343]">
            {data.data.promos.title![l]}
          </Text>
          <Text variant="caption-md-regular" className="text-[#434343]">
            {t("validUntil")}
            {dateFormat(data.data.promos.deadline!)}
          </Text>
        </div>

        <Link href={`${PATHS.home.promo}/${id}`} className="flex gap-2">
          <Text variant="caption-md-regular" className="text-blue">
            {t("learnMore")}
          </Text>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
};
