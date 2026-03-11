"use client";

import Img from "@/components/html/img";
import { Text } from "@/components/html/text";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  LOAN_DATA_HE_LOCAL_STORAGE,
  LOAN_DATA_LOCAL_STORAGE,
} from "@/lib/constants";
import otpBanned from "@/public/assets/ilus/otp-banned.svg";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type Props = { show: boolean; close: () => void };

export default function OTPBanned({ show, close }: Props) {
  const t = useTranslations("OTPBanned");
  const router = useRouter();

  const handleClickHomepage = () => {
    localStorage.removeItem(LOAN_DATA_LOCAL_STORAGE);
    localStorage.removeItem(LOAN_DATA_HE_LOCAL_STORAGE);
    router.push("/");
  };

  return (
    <Dialog open={show} onOpenChange={close}>
      <DialogTitle></DialogTitle>
      <DialogContent className="max-w-4xl max-h-3xl flex flex-col justify-center items-center">
        <Img src={otpBanned} alt="OTP Banned ilus" width={200} height={200} />
        <Text variant="display-md">{t("title")}</Text>
        <Text variant="caption-md-regular">{t("subtitle")}</Text>
        <Button variant="woori" className="w-60" onClick={handleClickHomepage}>
          {t("button")}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
