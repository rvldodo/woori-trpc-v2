"use client";

import Img from "@/components/html/img";
import { useTranslations } from "next-intl";
import notFound from "@/public/assets/ilus/not-found.svg";
import { Text } from "@/components/html/text";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PATHS } from "../urls";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="wrapper min-h-screen flex flex-col justify-center items-center">
      <Img
        src={notFound}
        alt="Not found"
        className="size-96"
        width={200}
        height={200}
      />
      <div className="flex flex-col justify-center items-center gap-8">
        <Text variant="display-lg">{t("title")}</Text>
        <Text variant="body-lg-medium" className="text-center">
          {t.rich("subtitle", {
            br: (chunks) => (
              <>
                <br />
                {chunks}
              </>
            ),
          })}
        </Text>
        <Link href={PATHS.home.base}>
          <Button variant="woori" className="p-5 rounded-lg">
            {t("button")}
          </Button>
        </Link>
      </div>
    </section>
  );
}
