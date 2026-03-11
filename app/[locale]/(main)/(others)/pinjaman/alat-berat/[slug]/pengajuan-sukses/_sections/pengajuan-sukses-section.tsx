"use client";

import { PATHS } from "@/app/urls";
import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Locale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import DataCabangSection from "./data-cabang-section";

type Props = {
  l: Locale;
  slug: string;
};

export default function PengajuanSuksesSection({ l, slug }: Props) {
  const t = useTranslations("PengajuanSuksesHE");
  const router = useRouter();

  const onBack = () => {
    router.push(PATHS.home.base);
  };

  return (
    <section className="py-8 w-full flex justify-center items-center flex-col gap-5 main-padding-x">
      <Card className="w-full bg-transparent border-2 border-white shadow-md backdrop-blur-xl">
        <CardTitle></CardTitle>
        <CardContent className="flex flex-col gap-3 justify-center items-center w-full">
          <div className="flex justify-center items-center flex-col gap-1 w-full">
            <Text
              as="div"
              variant="display-md"
              className="flex justify-center items-center w-full text-center"
            >
              {t.rich(`title.${slug}`, {
                br: (val) => (
                  <>
                    <br />
                    {val}
                  </>
                ),
              })}
            </Text>
          </div>

          <Text variant="body-md-regular" className="text-center">
            {t("subtitle")}
          </Text>
          <Button
            variant="woori_outline"
            type="button"
            onClick={onBack}
            className="w-60"
          >
            {t("button")}
          </Button>
        </CardContent>
      </Card>

      <DataCabangSection l={l} />
    </section>
  );
}
