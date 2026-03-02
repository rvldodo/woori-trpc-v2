"use client";

import { Text } from "@/components/html/text";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

type Props = {
  progress?: number;
};

export default function Progressbar({ progress = 1 }: Props) {
  const t = useTranslations("Form.progressbar");

  return (
    <section className="w-full flex justify-center items-center">
      <div className="w-[15%] flex gap-3 justify-center items-center">
        <div
          className={`flex flex-col justify-center items-center text-center ${
            progress >= 1 ? "text-[#007bc7]" : "text-[#B1B1B1]"
          }`}
        >
          <div
            className={`flex justify-center items-center w-[15px] h-[15px] bg-transparent border-[1.5px] ${
              progress >= 1 ? "border-[#007bc7]" : "border-[#B1B1B1]"
            } rounded-full`}
          >
            <div
              className={`w-[8px] h-[8px] ${progress >= 1 ? "bg-[#007bc7]" : "hiddent"} rounded-full`}
            />
          </div>
          <Text
            variant="body-md-medium"
            color={progress >= 1 ? "primary" : "default"}
          >
            {t("step1")}
          </Text>
        </div>

        <Separator
          className={`${progress >= 2 ? "bg-[#007bc7]" : "bg-[#B1B1B1]"}`}
        />

        <div
          className={`flex flex-col justify-center items-center text-center ${
            progress >= 2 ? "text-[#007bc7]" : "text-[#B1B1B1]"
          }`}
        >
          <div
            className={`flex justify-center items-center w-[15px] h-[15px] bg-transparent border-[1.5px] ${
              progress >= 2 ? "border-[#007bc7]" : "border-[#B1B1B1]"
            } rounded-full`}
          >
            <div
              className={`w-[8px] h-[8px] ${progress >= 2 ? "bg-[#007bc7]" : "hidden"} rounded-full`}
            />
          </div>
          <Text
            variant="body-md-medium"
            color={progress >= 2 ? "primary" : "default"}
          >
            {t("step2")}
          </Text>
        </div>

        <Separator
          className={`${progress === 3 ? "bg-[#007bc7]" : "bg-[#B1B1B1]"}`}
        />

        <div
          className={`flex flex-col justify-center items-center text-center ${
            progress === 3 ? "text-[#007bc7]" : "text-[#B1B1B1]"
          }`}
        >
          <div
            className={`flex justify-center items-center w-[15px] h-[15px] bg-transparent border-[1.5px] ${
              progress === 3 ? "border-[#007bc7]" : "border-[#B1B1B1]"
            } rounded-full`}
          >
            <div
              className={`w-[8px] h-[8px] ${progress === 3 ? "bg-[#007bc7]" : "hidden"} rounded-full`}
            />
          </div>
          <Text
            variant="body-md-medium"
            color={progress === 3 ? "primary" : "default"}
          >
            {t("step3")}
          </Text>
        </div>
      </div>
    </section>
  );
}
