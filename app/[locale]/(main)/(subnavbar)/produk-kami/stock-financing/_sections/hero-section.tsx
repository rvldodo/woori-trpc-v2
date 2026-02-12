import { Text } from "@/components/html/text";

export default function HeroSection() {
  return (
    <article className="relative w-full h-[60vh] bg-[url('/assets/image/our-products/stock-financing.png')] bg-cover">
      <section className="absolute md:wrapper px-[24px] w-full h-full flex flex-col text-white justify-center md:items-start items-center gap-3">
        <Text variant="body-lg-regular" color="white">
          Stock Financing
        </Text>
        <Text
          variant="display-lg"
          className="md:w-[35vw] w-full md:text-start text-center"
          color="white"
        >
          Tingkatkan Bisnis Showroom Anda dengan Stock Financing
        </Text>
      </section>
    </article>
  );
}
