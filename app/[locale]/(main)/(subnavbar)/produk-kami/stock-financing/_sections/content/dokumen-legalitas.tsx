"use client";

import ktp from "@assets/image/our-products/persyaratan/ktp.png";
import npwpKk from "@assets/image/our-products/persyaratan/npwp-kk.png";
import rekening from "@assets/image/our-products/persyaratan/rekening-koran.png";
import buktiDomisili from "@assets/image/our-products/persyaratan/bukti-domisili.png";
import bukuNikah from "@assets/image/our-products/persyaratan/buku-nikah.png";
import slipGaji from "@assets/image/our-products/persyaratan/slip-gaji.png";
import bukuTabungan from "@assets/image/our-products/persyaratan/buku-tabungan.png";
import suratPernyataan from "@assets/image/our-products/persyaratan/surat-pernyataan.png";
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
import { MailWarning } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Locale, useTranslations } from "next-intl";
import { PersyaratanCard } from "../../../_components/persyaratan-card";

export default function DokumenLegalitas() {
  const t = useTranslations("OurProduct.stockFinancing");
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
      <Text variant="display-md">Persyaratan dan Dokumen</Text>
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
          {slides.slice(0, 3).map((_, index) => (
            <div
              key={index.toString()}
              className={`h-2 w-2 rounded-full transition-all duration-300 ease-linear cursor-default ${
                index + 1 === current ? "bg-[#007bc7] px-6" : "bg-black"
              }`}
            />
          ))}
        </div>
      </Carousel>

      <div className="flex w-full items-center bg-light_yellow p-3 gap-3 mt-5">
        <MailWarning className="h-4 w-4" />
        <Text variant="caption-md-regular">
          Untuk detail lebih lanjut, silahkan menghubungi{" "}
          <Link href={PATHS.home.cabangKami} className="text-primary underline">
            Cabang kami
          </Link>
        </Text>
      </div>
    </section>
  );
}
