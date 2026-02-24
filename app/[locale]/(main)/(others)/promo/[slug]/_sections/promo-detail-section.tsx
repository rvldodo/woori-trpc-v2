"use client";

import { PATHS } from "@/app/urls";
import Img from "@/components/html/img";
import { Text } from "@/components/html/text";
import { TextHTML } from "@/components/html/text-html";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import { dateFormat, hyphenToPascalCase } from "@/lib/formatter";
import { api } from "@/trpc/react";
import { Locale } from "next-intl";
import { redirect } from "next/navigation";
import { Fragment } from "react/jsx-runtime";
import SuccessSendSubscription from "../success";
import { useModalState } from "@/hooks/useModalState";

type Props = {
  l: Locale;
  slug: string;
};

export default function PromoDetailSection({ l, slug }: Props) {
  const { data, isLoading } = api.main.promos.detail.useQuery(
    {
      slug,
    },
    { enabled: !!slug },
  );

  const { modal, onChangeModal } = useModalState();

  return (
    <Fragment>
      <SuccessSendSubscription
        show={modal.success}
        close={() => onChangeModal("success", false)}
      />

      <article className="main-padding-x flex flex-col gap-5">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <section className="py-3 w-full flex flex-col gap-3">
            <Breadcrumb className="py-5">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={PATHS.home.base}>
                    <Text variant="caption-md-regular">Halaman Utama</Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    className="cursor-pointer"
                    onClick={() => redirect(PATHS.home.promo)}
                  >
                    <Text variant="caption-md-regular">Promo</Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Text
                      variant="caption-md-regular"
                      className="text-[#007bc7]"
                    >
                      {hyphenToPascalCase(data?.data.promos.title?.[l] ?? "")}
                    </Text>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Text variant="display-lg">{data?.data.promos.title?.[l]}</Text>
                <Text variant="caption-md-regular">
                  Diperbaru pada{" "}
                  {dateFormat(data?.data.promos.createdTime ?? "")}
                </Text>
              </div>
              <Img
                src={`/api/files${data?.data.promos.imgUrlDesktop}`}
                alt={data?.data.promos.title?.[l]}
                width={1000}
                height={1000}
                className="w-full object-cover"
              />
              <Badge
                className="text-md text-primary-blue p-5 rounded-lg border-primary-blue"
                variant="ghost"
              >
                {data?.data.loan_types?.name}
              </Badge>
              <Accordion type="multiple">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <Text variant="display-md">
                      {l === "id" ? "Syarat & Ketentuan" : "Terms & Condition"}
                    </Text>
                  </AccordionTrigger>
                  <AccordionContent>
                    <TextHTML
                      variant="body-lg-regular"
                      html={data?.data.promos.termsAndCondition?.[l] ?? ""}
                    />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <Text variant="display-md">
                      {l === "id" ? "Mekanisme Promo" : "Promo Mechanism"}
                    </Text>
                  </AccordionTrigger>
                  <AccordionContent>
                    <TextHTML
                      variant="body-lg-regular"
                      html={data?.data.promos.promoMechanism?.[l] ?? ""}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        )}
      </article>
    </Fragment>
  );
}
