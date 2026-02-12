import Img from "@/components/html/img";
import { Text } from "@/components/html/text";
import type { StaticImageData } from "next/image";

type Props = {
  image: StaticImageData | string;
  title: string;
  description: string;
};

export function PersyaratanCard({ image, title, description }: Props) {
  return (
    <section className="flex flex-col gap-5 h-[30vh] justify-center items-center">
      <Img
        src={image}
        alt={title}
        className="rounded-full w-30 h-30 object-cover"
        width={1000}
        height={1000}
      />
      <div className="w-full flex flex-col justify-center items-center">
        <Text variant="body-lg-semi" className="text-center md:w-full w-[50vw]">
          {title}
        </Text>
        <Text
          variant="body-md-regular"
          className="text-center md:w-full w-[50vw]"
        >
          {description}
        </Text>
      </div>
    </section>
  );
}
