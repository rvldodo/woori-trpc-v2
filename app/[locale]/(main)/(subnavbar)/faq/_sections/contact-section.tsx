"use client";

import { PATHS } from "@/app/urls";
import { Text } from "@/components/html/text";
import { Separator } from "@/components/ui/separator";
import { MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function FAQContactSection() {
  const t = useTranslations("FAQ.contact");

  const email = "cs@woorifinance.co.id";
  const subject = encodeURIComponent(t("email.subject"));
  const body = encodeURIComponent(t("email.body"));

  const emailTo = `mailto:${email}?subject=${subject}&body=${body}`;
  const openGmail = () => {
    window.location.href = emailTo;
  };

  return (
    <section className="bg-[#F8FAFF]">
      <div className="md:wrapper px-[24px] flex flex-col md:flex-row justify-center items-center py-8">
        <div className="w-full md:w-1/2 px-8 py-5 flex flex-col justify-center items-center gap-4">
          <Text variant="display-lg">{t("haveOtherQuestions")}</Text>
          <button
            type="button"
            className="flex gap-3 items-center hover:opacity-80 transition-opacity text-primary cursor-pointer"
            onClick={openGmail}
          >
            <MessageSquare className="w-5 h-5 text-primary" />
            <Text
              variant="body-lg-medium"
              className="text-blue underline"
              color="primary"
            >
              {t("contactUs")}
            </Text>
          </button>
        </div>

        <Separator orientation="vertical" className="h-auto" />

        <div className="w-full md:w-1/2 px-8 py-5 flex flex-col justify-center items-center gap-4">
          <Text variant="display-lg">{t("needToComplain")}</Text>
          <Link
            href={PATHS.home.layananCustomer}
            className="flex gap-3 items-center hover:opacity-80 transition-opacity text-primary"
          >
            <Text
              variant="body-lg-medium"
              className="text-blue underline"
              color="primary"
            >
              {t("submitComplaint")}
            </Text>
          </Link>
        </div>
      </div>
    </section>
  );
}
