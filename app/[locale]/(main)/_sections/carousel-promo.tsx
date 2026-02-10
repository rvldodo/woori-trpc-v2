"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import bannerDesktop from "@/public/assets/banner/hero-banner-desktop.png";
import bannerDesktopApp from "@/public/assets/banner/hero-banner-download-desktop.png";
import { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { PATHS } from "@/app/urls";
import Img from "@/components/html/img";
import type { StaticImageData } from "next/image";

const slides = [
  { img: bannerDesktop, alt: "Hero Banner Promotions" },
  { img: bannerDesktopApp, alt: "Hero Banner Download App" },
];

export default function CarouselPromoSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  const heroPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel plugins={[heroPlugin.current]} setApi={setApi}>
      <CarouselContent>
        {slides?.map(
          (e: { img: StaticImageData; alt: string }, idx: number) => (
            <CarouselItem key={idx.toString()}>
              <div
                className="w-full h-full relative"
                // href={idx === 0 ? PATHS.home.promo : ""}
              >
                <a href={idx === 0 ? PATHS.home.promo : ""}>
                  <Img alt={e.alt} src={e.img} className="w-full object-fit" />
                </a>
              </div>
            </CarouselItem>
          ),
        )}
      </CarouselContent>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            type="button"
            key={index.toString()}
            className={`h-2 w-2 rounded-full transition-all duration-300 ease-linear cursor-default ${
              index + 1 === current ? "bg-[#007BC7] px-6" : "bg-[#F8FAFF]"
            }`}
          />
        ))}
      </div>
    </Carousel>
  );
}
