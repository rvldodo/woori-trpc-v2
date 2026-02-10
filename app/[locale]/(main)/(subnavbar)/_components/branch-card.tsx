"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getUrlBranchMap } from "@/lib/utils";
import { Fragment, useEffect, useState } from "react";
import { Text } from "@/components/html/text";
import { Phone, Pin } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Img from "@/components/html/img";
import { parseAsString, useQueryStates } from "nuqs";

export type BranchCardTypes = {
  title: string;
  location: string;
  phone_number: string;
  className?: string;
  lat?: string;
  long?: string;
  image?: string | StaticImageData;
  click?: () => void;
};

export const CabangCard = ({
  title,
  location,
  phone_number,
  className,
  lat = "",
  long = "",
  image = "/files/branch/bandung.png",
  click,
}: BranchCardTypes) => {
  const t = useTranslations("OurBranch");
  const [open, setOpen] = useState<boolean>(false);

  const [view, setView] = useQueryStates({
    view: parseAsString.withDefault(""),
  });

  useEffect(() => {
    if (!open) {
      setView({ view: "" });
    }
  }, [open, setView]);

  return (
    <Fragment>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-transparent bg-none border-none ring-0 max-w-3xl">
          <DialogTitle></DialogTitle>
          <Img
            src={`/api/files${image}`}
            alt={title}
            className="max-h-full max-w-full object-contain fit"
            width={1000}
            height={1000}
          />
        </DialogContent>
      </Dialog>

      <Card className="hover:border hover:border-primary shadow-md">
        <CardContent
          onClick={click}
          className={cn(
            "flex flex-col gap-5 bg-[#FFFFFF] border-transparent shadow-none radius-lg h-full justify-between w-full",
            className,
          )}
        >
          <Text variant="body-lg-semi" className="text-start">
            {title}
          </Text>
          <div className="flex gap-5 items-start w-full h-auto">
            <Link
              href={getUrlBranchMap(lat, long)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text
                variant="caption-md-regular"
                className="text-[#007bc7] underline cursor-pointer text-start"
              >
                {location}
              </Text>
            </Link>
          </div>
          <div className="flex gap-5 items-center">
            <Text variant="caption-md-regular" className="text-[#007bc7]">
              {phone_number}
            </Text>
          </div>
        </CardContent>
        <Button
          variant="woori_white"
          className="p-3 rounded-lg mx-5"
          onClick={() => {
            setOpen(true);
            setView({ view: title });
          }}
        >
          {t("detail")}
        </Button>
      </Card>
    </Fragment>
  );
};
