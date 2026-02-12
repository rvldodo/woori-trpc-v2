import { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/html/text";
import Img from "@/components/html/img";
import { useTranslations } from "next-intl";

type Props = {
  id?: number;
  icon: StaticImageData | string;
  title: string;
  description: string;
  path: string;
};

export const ProductCard = ({ icon, title, description, path = "" }: Props) => {
  const t = useTranslations();
  return (
    <Card className="bg-white border-none flex flex-col justify-evenly gap-8 p-5 w-full">
      <Img src={icon} alt={`icon-${title}`} width={100} height={100} />
      <div className="flex flex-col gap-2">
        <Text variant="body-lg-semi">{title}</Text>
        <Text variant="caption-md-medium">{description}</Text>
      </div>
      <Link href={path || "/"} className="flex gap-3 items-center">
        <Text variant="caption-md-regular" className="text-blue">
          {t("OurProductHome.detail")}
        </Text>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Card>
  );
};
