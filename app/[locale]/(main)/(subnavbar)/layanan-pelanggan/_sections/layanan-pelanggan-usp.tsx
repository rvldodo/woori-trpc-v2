"use client";

import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

export default function USPLayananPelanggan() {
  const t = useTranslations("CustomerSupport.uspLayananPelanggan");

  const emailUser = "cs@woorifinance.co.id";
  const subject = encodeURIComponent(t("email.subject"));
  const body = encodeURIComponent(t("email.body"));

  const emailTo = `mailto:${emailUser}?subject=${subject}&body=${body}`;
  const openGmail = useCallback(() => {
    window.location.href = emailTo;
  }, [emailTo]);
  return (
    <article className="main-padding-x flex flex-col justify-start items-center gap-3">
      <div className="absolute left-[70rem] w-[30vw] aspect-square rounded-full bg-[hsla(203,89%,48%,0.4)] blur-[200px] blur-element opacity-60" />
      <div className="absolute left-[50rem] w-[20vw] aspect-square rounded-full bg-[hsla(262,83%,85%,0.3)] blur-[200px] blur-element opacity-50" />
      <div className="absolute right-[70rem] w-[30vw] aspect-square rounded-full bg-[hsla(203,89%,48%,0.4)] blur-[200px] blur-element opacity-60" />
      <div className="absolute right-[50rem] w-[20vw] aspect-square rounded-full bg-[hsla(262,83%,85%,0.3)] blur-[200px] blur-element opacity-50" />
      {/* Hero Card */}
      <section className="w-full flex justify-center items-center flex-col py-10 z-10">
        <Card className="w-full">
          <CardContent className="w-full flex flex-col gap-6 bg-[#ffffff]/20 backdrop-blur-xl justify-center items-center py-5 rounded-lg">
            <div className="flex flex-col gap-3 justify-center items-center">
              <Text variant="display-lg" className="md:text-start text-center">
                {t("title")}
              </Text>
              <Text variant="body-lg-medium">{t("subtitle")}</Text>
            </div>
            <Button
              variant="woori_outline"
              className="flex justify-center p-3 gap-2 md:w-[18%] w-[50%] bg-[#fffff]/20 backdrop-blur-xl rounded-lg"
              onClick={openGmail}
            >
              <MessageSquare className="w-5 h-5 text-primary" />
              {t("button")}
            </Button>
          </CardContent>
        </Card>
      </section>
    </article>
  );
}
