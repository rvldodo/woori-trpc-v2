"use client";

import Img from "@/components/html/img";
import { Text } from "@/components/html/text";
import { Card, CardContent } from "@/components/ui/card";
import showroom1 from "@/public/assets/image/showroom/showroom1.png";
import showroom2 from "@/public/assets/image/showroom/showroom2.png";
import showroom3 from "@/public/assets/image/showroom/showroom3.png";
import insurance1 from "@/public/assets/image/insurance/insurance1.png";
import insurance2 from "@/public/assets/image/insurance/insurance2.png";
import insurance3 from "@/public/assets/image/insurance/insurance3.png";
import insurance4 from "@/public/assets/image/insurance/insurance4.png";
import insurance5 from "@/public/assets/image/insurance/insurance5.png";
import insurance6 from "@/public/assets/image/insurance/insurance6.png";
import insurance7 from "@/public/assets/image/insurance/insurance7.png";
import bank3 from "@/public/assets/image/bank/bank3.svg";
import bank4 from "@/public/assets/image/bank/bank4.png";
import bank6 from "@/public/assets/image/bank/bank6.svg";
import bank7 from "@/public/assets/image/bank/bank7.png";
import { useTranslations } from "next-intl";

export default function KemitraanLogos() {
  const t = useTranslations("Partnership.logos");

  return (
    <article className="main-padding-x py-8 flex flex-col justify-start items-center gap-3">
      <div className="-left-[70rem] top-[20rem] w-[40%] h-[50%] bg-[#0A9CED]absolute" />
      <div className="-right-[70rem] top-[50rem] w-[40%] h-[50%] bg-purple-200 absolute" />
      <Card className="shadow-none w-full z-10">
        <CardContent className="w-full flex flex-col justify-center items-center p-5 bg-[#ffffff] border-none z-10 mb-8 shadow-none">
          <Text variant="display-lg">{t("showroom")}</Text>
          <div className="grid md:grid-cols-3 grid-cols-3 gap-2 pt-5 w-full place-items-center">
            <Img alt="img1" src={showroom1} width={150} />
            <Img alt="img2" src={showroom2} width={150} />
            <Img alt="img3" src={showroom3} width={150} />
          </div>
          <Text variant="display-lg" className="pt-16">
            {t("insurance")}
          </Text>
          <div className="grid md:grid-cols-4 grid-cols-3 gap-2 w-full place-items-center">
            <Img alt="img1" src={insurance1} width={150} />
            <Img alt="img2" src={insurance2} width={150} />
            <Img alt="img3" src={insurance3} width={150} />
            <Img alt="img3" src={insurance4} width={150} />
            <Img alt="img3" src={insurance5} width={150} />
            <Img alt="img3" src={insurance6} width={150} />
            <Img alt="img3" src={insurance7} width={150} />
          </div>
          <Text variant="display-lg" className="pt-16">
            {t("bank")}
          </Text>
          <div className="grid md:grid-cols-4 grid-cols-3 gap-14 pt-5 w-full place-items-center">
            {/* <Img alt="img1" src={bank1} width={150} /> */}
            {/* <Img alt="img2" src={bank2} width={150} /> */}
            <Img alt="img3" src={bank3} width={150} />
            <Img alt="img3" src={bank4} width={150} />
            {/* <Img alt="img3" src={bank5} width={150} /> */}
            <Img alt="img3" src={bank6} width={150} />
            <Img alt="img3" src={bank7} width={150} />
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
