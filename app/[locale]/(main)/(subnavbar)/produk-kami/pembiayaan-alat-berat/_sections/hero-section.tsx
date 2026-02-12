import { PATHS } from "@/app/urls";
import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <article className="relative w-full h-[60vh] bg-[url('/assets/image/our-products/alat-berat.png')] bg-cover">
      <section className="absolute md:wrapper px-[24px] w-full h-full flex flex-col text-white justify-center md:items-start items-center gap-3">
        <Text variant="body-lg-regular" color="white">
          Pembiayaan Alat Berat
        </Text>
        <Text
          variant="display-lg"
          className="md:w-[35vw] w-full md:text-start text-center"
          color="white"
        >
          Solusi Pinjaman Alat Berat yang Berkualitas dan Ekonomis
        </Text>
        <div>
          <Link href={PATHS.home.pinjaman.alatBerat.base}>
            <Button variant="button_hero" className="p-5 flex gap-4 shadow-xl">
              Ajukan Pinjaman Sekarang
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </article>
  );
}
