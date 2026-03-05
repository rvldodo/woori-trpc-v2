"use client";

import { Locale, useTranslations } from "next-intl";
import Progressbar from "../../../_components/progress-bar";
import { Text } from "@/components/html/text";
import { useEffect, useState } from "react";
import { LOAN_DATA_LOCAL_STORAGE } from "@/lib/constants";
import z from "zod";
import { schema } from "@/server/api/schema";
import { phoneNumberAnonymous } from "@/lib/formatter";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/trpc/react";
import { PATHS } from "@/app/urls";
import { redirect, useRouter } from "next/navigation";

type Props = {
  l: Locale;
  slug: string;
};

type Schema = z.infer<typeof schema.form.loan>;

export default function VerifikasiSection({ l, slug }: Props) {
  const t = useTranslations("Verifikasi");
  const router = useRouter();

  const [parsedData, setParsedData] = useState<Partial<Schema> | null>(null);
  const [countdown, setCountdown] = useState<number>(0);
  const [otpCheck, setOTPCheck] = useState<string>("");

  const { mutate: createLoan, isPending: createLoanPending } =
    api.main.loan.create.useMutation();

  const { mutate, isPending } = api.main.user.verifyOTP.useMutation({
    onSuccess: () => {
      if (!parsedData) return;

      createLoan(parsedData as Schema);

      router.push(`${PATHS.home.pinjaman.base}/${slug}/pengajuan-sukses`);

      localStorage.removeItem(LOAN_DATA_LOCAL_STORAGE);
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem(LOAN_DATA_LOCAL_STORAGE);

    if (!saved) redirect(PATHS.home.base);
    setParsedData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (otpCheck !== "" && otpCheck.length === 6) {
      mutate({ otp: otpCheck });
    }
  }, [otpCheck, mutate]);

  const handleOTPCheck = (otp: string) => {
    setOTPCheck(otp);
  };

  return (
    <article className="py-8 w-full flex justify-center items-center flex-col gap-5 main-padding-x">
      <Progressbar progress={3} />

      <div className="w-full flex flex-col justify-center items-center">
        <Text variant="display-md">{t("title")}</Text>
        <Text variant="body-md-regular" className="text-center">
          {t.rich("subtitle", {
            br: (val) => (
              <>
                <br />
                {val}
              </>
            ),
            phoneNumber: phoneNumberAnonymous(parsedData?.phone_number ?? ""),
          })}
        </Text>
      </div>

      <InputOTP maxLength={6} onChange={handleOTPCheck} disabled={isPending}>
        <InputOTPGroup>
          <InputOTPSlot className="size-14" index={0} />
          <InputOTPSlot className="size-14" index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot className="size-14" index={2} />
          <InputOTPSlot className="size-14" index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot className="size-14" index={4} />
          <InputOTPSlot className="size-14" index={5} />
        </InputOTPGroup>
      </InputOTP>

      <section className="flex flex-col gap-3 justify-center items-center">
        <Text variant="body-md-regular">{t("notGetOTP")}</Text>
        <Text variant="body-md-regular" color="primary">
          {t("sendAgain")}
        </Text>
      </section>
    </article>
  );
}
