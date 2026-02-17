"use client";

import { PATHS } from "@/app/urls";
import { Text } from "@/components/html/text";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Locale, useTranslations } from "next-intl";
import { PersyaratanCard } from "../../../_components/persyaratan-card";
import { Volume2 } from "lucide-react";

export default function PersyaratanDokumenTabs() {
  const t = useTranslations("OurProduct.carLoan");
  const [api, setApi] = useState<CarouselApi>();

  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const items: Array<{ image: string; title: string; description: string }> =
    t.raw("persyaratan.items");
  const slides = [...items];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="wrapper-sm flex flex-col w-full gap-6 h-auto py-3 relative overflow-hidden z-10">
      <Text variant="display-md">{t("persyaratan.title")}</Text>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {items.map((e, idx: number) => {
            return (
              <CarouselItem
                key={idx.toString()}
                className="md:basis-1/3 basis-1/1 flex justify-between items-center px-2"
              >
                <PersyaratanCard
                  image={e.image}
                  title={e.title}
                  description={e.description}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="md:flex hidden" />
        <CarouselNext
          disabled={current + 1 === count && true}
          className="md:flex hidden"
        />

        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.slice(0, 4).map((_, index) => (
            <div
              key={index.toString()}
              className={`h-2 w-2 rounded-full transition-all duration-300 ease-linear cursor-default ${
                index + 1 === current ? "bg-[#007bc7] px-6" : "bg-black"
              }`}
            />
          ))}
        </div>
      </Carousel>

      <div className="flex w-full items-center bg-background-warning-secondary gap-3 p-3">
        <Volume2 className="w-4 h-4" />
        <Text variant="caption-md-regular">
          {t("persyaratan.warning.text")}{" "}
          <Link href={PATHS.home.cabangKami} className="text-primary underline">
            {t("persyaratan.warning.link")}
          </Link>
        </Text>
      </div>
    </section>
  );
}
