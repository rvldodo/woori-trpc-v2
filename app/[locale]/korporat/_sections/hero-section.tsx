"use client";

import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import { Locale, useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  l: Locale;
};

export default function HeroSection({ l }: Props) {
  const t = useTranslations("Corporate");

  const { data: heroData, isLoading: loadingHero } =
    api.main.hero.list.useQuery();

  return (
    <article
      className="relative w-full h-[60vh] bg-[url('/assets/image/corporate.png')] bg-cover"
      style={{ backgroundPosition: "center 35%", backgroundSize: "150%" }}
    >
      <div className="w-full h-full absolute bg-gradient-to-t from-[#0080A9]/100 via-transparent to bg-transparent" />
      {loadingHero || !heroData ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <section className="absolute main-padding-x w-full h-full flex flex-col text-white justify-center gap-4">
          <Text
            variant="display-lg"
            className="md:w-[40vw] w-full md:text-start text-center text-white"
          >
            {heroData.data.title![l]}
          </Text>
          <Text
            variant="body-lg-medium"
            className="md:w-[40vw] w-full md:text-start text-center text-white shadow-md"
          >
            {heroData.data.description![l]}
          </Text>

          <Link href="#profil">
            <Button variant="woori" className="p-5 md:w-[15vw] w-full">
              <Text variant="body-md-medium" className="text-white">
                {t("hero.title")}
              </Text>
            </Button>
          </Link>
        </section>
      )}
    </article>
  );
}
