"use client";

import { PATHS } from "@/app/urls";
import { Text } from "@/components/html/text";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { Locale } from "next-intl";
import Link from "next/link";
import { useTranslations } from "use-intl";
import { AccordionTabs } from "../_components/accordion-tabs";

type Props = {
  l: Locale;
};

export default function FAQSection({ l }: Props) {
  const t = useTranslations("Faq");

  const { data, isLoading } = api.main.faqs.main.useQuery();

  const openGmail = () => {
    const email = "cs@woorifinance.co.id";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("Complaint")}&body=${encodeURIComponent(
      "Hello,\n\nI hope this email finds you well.\n\nI am reaching out to inquire about your services.\n\nBest regards,\nYour Name",
    )}`;
  };

  return (
    <section className="main-padding-x flex gap-8 py-8">
      <div className="absolute right-[90rem] md:w-[30vw] lg:w-[40vw] aspect-square rounded-full bg-[rgba(10,156,237,0.2)] lg:filter lg:blur-[100px]" />
      <div className="w-full md:flex hidden flex-col gap-5 justify-center items-center z-10">
        <Text variant="display-lg" className="text-[#161616]">
          {t("title")}
        </Text>
        <Text variant="body-lg-medium" className="text-[#434343]">
          {t("cantFind")}
        </Text>
        <Link href={PATHS.home.faq || "/"} className="w-full">
          <Button
            variant="woori"
            className="p-5 flex justify-center gap-2 w-full"
          >
            <Text variant="body-md-semi" className="text-white">
              {t("seeOtherFaqs")}
            </Text>
          </Button>
        </Link>
        <Text
          variant="body-md-medium"
          className="text-[#007bc7] hover:cursor-pointer"
          onClick={openGmail}
        >
          {t("contactUs")}
        </Text>
      </div>
      <div className="w-full flex gap-5 flex-col justify-center items-center z-10">
        <Text
          variant="display-md"
          className="text-[#161616] text-center md:hidden flex"
        >
          {t("title")}
        </Text>
        <Accordion type="single" defaultValue="item-0">
          {isLoading ? (
            <Skeleton className="w-30 h-10" />
          ) : (
            data?.data.map((e, idx: number) => {
              return (
                <div key={idx.toString()} className="w-full">
                  <AccordionTabs
                    id={idx}
                    question={e.question![l]}
                    answer={e.answer![l]}
                  />
                  <Separator className="bg-[#E7E7E7] mb-5" />
                </div>
              );
            })
          )}
        </Accordion>
        <Text
          variant="body-lg-medium"
          className="text-[#434343] md:hidden flex"
        >
          {t("cantFind")}
        </Text>
        <Link href={PATHS.home.faq || "/"} className="w-full md:hidden flex">
          <Button
            variant="woori"
            className="p-5 flex justify-center gap-2 w-full"
          >
            <Text variant="body-lg-medium" className="text-white">
              {t("seeOtherFaqs")}
            </Text>
          </Button>
        </Link>
        <Text
          variant="body-lg-medium"
          className="text-[#007bc7] hover:cursor-pointer md:hidden flex"
          onClick={openGmail}
        >
          {t("contactUs")}
        </Text>
      </div>
    </section>
  );
}
