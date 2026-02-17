"use client";
import { useTranslations } from "next-intl";
import customerMeet from "@/public/assets/ilus/our-products/customer-meets-he.png";
import submitted from "@/public/assets/ilus/submitted.png";
import cmoSurvery from "@/public/assets/ilus/our-products/cmo-survey-he.png";
import meetWfi from "@/public/assets/ilus/our-products/meet-wfi.png";
import delivery from "@/public/assets/ilus/our-products/delivery-he.png";
import ProcessTimelineComponent from "../../../_components/proses-timeline";
import { Text } from "@/components/html/text";
import { Volume2 } from "lucide-react";
import Link from "next/link";
import { PATHS } from "@/app/urls";

export default function ProsesPengajuanTabs() {
  const t = useTranslations("OurProduct.heLoan.prosesPengajuan");
  const proses = [
    {
      image: customerMeet,
      title: t("items.step1.title"),
      description: t("items.step1.description"),
    },
    {
      image: cmoSurvery,
      title: t("items.step2.title"),
      description: t("items.step2.description"),
    },
    {
      image: submitted,
      title: t("items.step3.title"),
      description: t("items.step3.description"),
    },
    {
      image: meetWfi,
      title: t("items.step4.title"),
      description: t("items.step4.description"),
    },
    {
      image: delivery,
      title: t("items.step5.title"),
      description: t("items.step5.description"),
    },
  ];

  return (
    <section className="relative w-full py-3 flex flex-col overflow-hidden z-10">
      <Text variant="display-md">{t("title")}</Text>
      <ProcessTimelineComponent proses={proses} />
      <div className="flex w-full items-center bg-background-warning-secondary gap-3 p-3">
        <Volume2 className="w-4 h-4" />
        <Text variant="caption-md-regular">
          {t("warning.text")}{" "}
          <Link href={PATHS.home.cabangKami} className="text-primary underline">
            {t("warning.link")}
          </Link>
        </Text>
      </div>
    </section>
  );
}
