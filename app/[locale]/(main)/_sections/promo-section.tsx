"use client";

import { PATHS } from "@/app/urls";
import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { api } from "@/trpc/react";
import { type Locale, useTranslations } from "next-intl";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { PromoCard } from "../_components/promo-card";
import { Fragment, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";
import bannerDesktop from "@/public/assets/banner/hero-banner-desktop.png";
import promoBanner from "@/public/assets/banner/Web Banner 1200 x 390 Pixel.jpg";
import promoBanner2 from "@/public/assets/banner/Web Banner Premium 1200 x 390 Px.jpg";

type Props = {
  l: Locale;
};

export default function PromoSection({ l }: Props) {
  const t = useTranslations("Promo");
  const promoPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  const [apiCarousel, setApiCarousel] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const slides2 = [
    { img: bannerDesktop, alt: "Hero Banner Promotions" },
    { img: promoBanner, alt: "Hero Banner Download App" },
    { img: promoBanner2, alt: "Hero Banner Download App 2" },
  ];

  const { data: promo, isLoading } = api.main.promos.main.useQuery();

  return (
    <section className="md:main-padding-x flex flex-col gap-3 py-8 relative overflow-hidden">
      {isLoading || !promo ? (
        <div className="flex gap-3">
          <Skeleton className="w-20 h-15 rounded-lg" />
        </div>
      ) : (
        <Fragment>
          <div className="main-padding-x flex justify-between items-center">
            <Text variant="display-lg">{t("title")}</Text>
            {promo?.data && promo.data.length > 0 && (
              <Link href={PATHS.home.promo || "/"} className="md:flex hidden">
                <Button
                  variant="woori"
                  className="md:p-5 p-3 py-5 flex gap-2 shadow-xl"
                >
                  {t("seeAll")}
                </Button>
              </Link>
            )}
          </div>

          {promo?.data && promo.data.length > 0 ? (
            <div className="main-padding-x">
              <Carousel className="w-full">
                <CarouselContent className="border-none">
                  {promo.data.map((e) => {
                    return (
                      <CarouselItem
                        key={e.id}
                        className="md:basis-1/3 basis-1/1 flex justify-center md:px-0 mx-2 border-none"
                      >
                        <PromoCard l={l} slug={e.title?.[l] ?? ""} />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="bg-[#2D2D2D66] md:flex mx-5 hidden" />
                <CarouselNext className="bg-[#2D2D2D66] md:flex mx-5 md hidden" />
              </Carousel>

              <Link
                href={PATHS.home.promo || "/"}
                className="md:hidden flex pt-5"
              >
                <Button variant="woori" className="p-5 rounded-[16px] w-full">
                  <Text variant="body-lg-medium" className="text-white">
                    {t("seeAll")}
                  </Text>
                </Button>
              </Link>
            </div>
          ) : (
            <Carousel plugins={[promoPlugin.current]} setApi={setApiCarousel}>
              <CarouselContent>
                {slides2?.map(
                  (e: { img: StaticImageData; alt: string }, idx: number) => (
                    <CarouselItem key={idx.toString()}>
                      <div
                        className="w-full h-full relative"
                        // href={idx === 0 ? PATHS.home.promo : ""}
                      >
                        <Image
                          alt={e.alt}
                          src={e.img}
                          quality={100}
                          className="w-full object-fit rounded-xl"
                        />
                      </div>
                    </CarouselItem>
                  ),
                )}
              </CarouselContent>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides2.map((_, index: number) => (
                  <button
                    type="button"
                    key={index.toString()}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ease-linear cursor-default ${
                      index + 1 === current
                        ? "bg-[#007BC7] px-6"
                        : "bg-[#F8FAFF]"
                    }`}
                  />
                ))}
              </div>
            </Carousel>
          )}
        </Fragment>
      )}
    </section>
  );
}
