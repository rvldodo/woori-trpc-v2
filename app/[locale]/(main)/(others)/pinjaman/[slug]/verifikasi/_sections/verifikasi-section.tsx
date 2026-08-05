"use client";

import { Locale, useTranslations } from "next-intl";
import Progressbar from "../../../_components/progress-bar";
import { Text } from "@/components/html/text";
import { Fragment, useEffect, useState } from "react";
import { COUNTDOWN, LOAN_DATA_LOCAL_STORAGE } from "@/lib/constants";
import z from "zod";
import { schema } from "@/server/api/schema";
import { formatTime, phoneNumberAnonymous } from "@/lib/formatter";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/trpc/react";
import { PATHS } from "@/app/urls";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import OTPBanned from "../../pengajuan-pinjaman/otp-banned";
import { useModalState } from "@/hooks/useModalState";

type Props = {
  l: Locale;
  slug: string;
};

type Schema = z.infer<typeof schema.form.loan>;

export default function VerifikasiSection({ l, slug }: Props) {
  const t = useTranslations("Verifikasi");
  const router = useRouter();

  const [parsedData, setParsedData] = useState<Partial<Schema> | null>(null);
  const [otpCheck, setOTPCheck] = useState<string>("");
  const [invalid, setInvalid] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [canResend, setCanResend] = useState(false);

  const { mutate: createLoan } = api.main.loan.create.useMutation();

  const { data: counterData } = api.main.user.counterOTP.useQuery(
    {
      phone: parsedData?.phone_number ?? "",
    },
    {
      enabled: !!parsedData?.phone_number, // Only run query if phone exists
    },
  );

  const { mutate: counterUpdate } = api.main.user.counterUpdate.useMutation();

  const { data: userDataOTP } = api.main.user.findUser.useQuery(
    { phone: parsedData?.phone_number ?? "" },
    { enabled: !!parsedData?.phone_number },
  );

  useEffect(() => {
    if (userDataOTP?.data?.counter !== undefined) {
      const initialCountdown =
        COUNTDOWN[Number(userDataOTP?.data.counter)] || 0;
      setCountdown(initialCountdown);
      setCanResend(initialCountdown === 0);
    }
  }, [userDataOTP?.data?.counter]);

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const { mutate, isPending } = api.main.user.verifyOTP.useMutation({
    onSuccess: () => {
      if (!parsedData) return;

      createLoan(parsedData as Schema);

      router.push(`${PATHS.home.pinjaman.base}/${slug}/pengajuan-sukses`);

      localStorage.removeItem(LOAN_DATA_LOCAL_STORAGE);
    },
    onError: () => {
      setInvalid(true);
      setOTPCheck("");
    },
  });

  const { mutate: sendOTPAgain, isPending: sendOTPAgainPending } =
    api.main.user.sendOTP.useMutation({
      onSuccess: () => {
        setInvalid(false);
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

  const handleResendOTP = () => {
    if (!canResend || !counterData) return;

    const currentCounter = counterData.counter || 0;

    if (currentCounter >= 4) {
      setCanResend(false);
      const newCountdown = COUNTDOWN[currentCounter + 1] || 0;
      setCountdown(newCountdown);
      onChangeModal("banned", true);
      return;
    }

    // update counter
    counterUpdate({
      phone: parsedData?.phone_number ?? "",
      counter: currentCounter + 1,
    });

    // send OTP
    sendOTPAgain({ phone: parsedData?.phone_number ?? "" });

    // reset countdown
    const newCountdown = COUNTDOWN[currentCounter + 1] || 0;
    setCountdown(newCountdown);
    setCanResend(false);

    // reset otp input
    setOTPCheck("");
    setInvalid(false);
  };

  const isMaxAttemptsReached = (counterData?.counter || 0) >= 4;

  const { modal, onChangeModal } = useModalState();

  return (
    <Fragment>
      <OTPBanned
        close={() => onChangeModal("banned", false)}
        show={modal.banned}
      />

      <article className="py-8 w-full flex justify-center items-center flex-col gap-5 main-padding-x">
        <Progressbar progress={3} />

        <div className="w-full flex flex-col justify-center items-center">
          <Text variant="display-md" className="text-center">
            {t("title")}
          </Text>
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

        <InputOTP
          maxLength={6}
          value={otpCheck}
          onChange={handleOTPCheck}
          disabled={isPending}
        >
          <InputOTPGroup>
            <InputOTPSlot
              className="size-14"
              index={0}
              aria-invalid={invalid}
            />
            <InputOTPSlot
              className="size-14"
              index={1}
              aria-invalid={invalid}
            />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot
              className="size-14"
              index={2}
              aria-invalid={invalid}
            />
            <InputOTPSlot
              className="size-14"
              index={3}
              aria-invalid={invalid}
            />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot
              className="size-14"
              index={4}
              aria-invalid={invalid}
            />
            <InputOTPSlot
              className="size-14"
              index={5}
              aria-invalid={invalid}
            />
          </InputOTPGroup>
        </InputOTP>
        {invalid && (
          <Text variant="caption-md-regular" color="error">
            Kode OTP yang Anda masukan Salah. Silahkan coba lagi!
          </Text>
        )}

        <section className="flex flex-col gap-3 justify-center items-center">
          <Text variant="body-md-regular">
            {t("notGetOTP")}
            {countdown > 0 && (
              <span className="text-gray-400"> {formatTime(countdown)}</span>
            )}
          </Text>

          {isMaxAttemptsReached ? (
            <Text variant="caption-md-regular" color="error">
              Maksimum percobaan OTP tercapai. Silakan coba lagi nanti.
            </Text>
          ) : (
            <Button
              variant="ghost"
              onClick={handleResendOTP}
              disabled={!canResend || isPending || sendOTPAgainPending}
            >
              <Text variant="body-md-regular" color="primary">
                {t("sendAgain")}
              </Text>
            </Button>
          )}
        </section>
      </article>
    </Fragment>
  );
}
