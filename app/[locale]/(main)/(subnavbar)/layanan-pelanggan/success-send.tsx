"use client";

import Img from "@/components/html/img";
import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import complaintIlus from "@/public/assets/ilus/complaint.png";
import { useTranslations } from "next-intl";
import { PATHS } from "@/app/urls";

type Props = { show: boolean; close: () => void };

export default function SuccessSendEmail({ show, close }: Props) {
  const t = useTranslations("CustomerSupport.complaint");

  return (
    <Dialog open={show} onOpenChange={close}>
      <DialogContent className="max-w-3xl max-h-3xl flex flex-col gap-3 justify-center items-center">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="p-8 w-full flex flex-col justify-center items-center text-center gap-8">
          <div className="flex flex-col justify-center items-center">
            <Img
              alt="ilus"
              src={complaintIlus}
              width={1000}
              height={1000}
              className="py-10"
            />
            <Text variant="display-lg">{t("modal.title")}</Text>
            <Text className="md:w-[35vw] w-full pt-4" variant="body-lg-medium">
              {t.rich("modal.subtitle", {
                br: (chunks) => (
                  <>
                    <br /> {chunks}
                  </>
                ),
              })}
            </Text>
          </div>
          <Link href={PATHS.home.base}>
            <Button variant="woori" className="p-5 rounded-lg">
              {t("modal.button")}
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
