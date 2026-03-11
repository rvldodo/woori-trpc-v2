"use client";

import { type Locale, useTranslations } from "next-intl";
import Progressbar from "../../../_components/progress-bar";
import { Text } from "@/components/html/text";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { formatCurrency, hyphenToPascalCase } from "@/lib/formatter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  INSURANCE_TYPE,
  LOAN_DATA_HE_LOCAL_STORAGE,
  TOOLTIP_INSURANCE_TYPE,
} from "@/lib/constants";
import type { LocaleContentOptional } from "@/types";
import { Fragment, useCallback, useEffect, useState } from "react";
import { schema } from "@/server/api/schema";
import type z from "zod";
import { redirect } from "next/navigation";
import { PATHS } from "@/app/urls";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsString, useQueryStates } from "nuqs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { api } from "@/trpc/react";
import { useModalState } from "@/hooks/useModalState";
import OTPBanned from "../../../../[slug]/pengajuan-pinjaman/otp-banned";

type Props = {
  l: Locale;
  slug: string;
};

type Schema = z.infer<typeof schema.form.loan>;

export default function PengajuanPinjamanSection({ l, slug }: Props) {
  const t = useTranslations("PengajuanPinjamanHE");
  const p = useTranslations();

  const [openInsurance, setOpenInsurance] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<number>(1);

  const [filter, setFilter] = useQueryStates({
    user_type: parseAsString.withDefault("individu"),
  });

  const { handleSubmit, setValue, register, watch, control, reset } =
    useForm<Schema>({
      mode: "all",
      resolver: zodResolver(schema.form.loan),
    });

  const nextTooltipHandler = useCallback(() => {
    setTooltip((prev) => Math.min(prev + 1, TOOLTIP_INSURANCE_TYPE.length));
  }, []);

  const previousTooltipHandler = useCallback(() => {
    setTooltip((prev) => Math.max(prev - 1, 1));
  }, []);

  const [parsedData, setParsedData] = useState<Partial<Schema> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LOAN_DATA_HE_LOCAL_STORAGE);
    if (!saved) redirect(PATHS.home.base);
    setParsedData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (parsedData) {
      reset({
        year: parsedData.year?.toString(),
        ...parsedData,
      });
    }
  }, [parsedData, reset]);

  const { mutate, isPending } = api.main.user.sendOTP.useMutation();
  const { mutate: sendOTP } = api.main.user.sendOTP.useMutation();
  const { mutate: counterUpdate } = api.main.user.counterUpdate.useMutation();
  const { mutate: createCounterOTP } =
    api.main.user.createCounterOTP.useMutation();

  const { mutate: findUserByPhone } =
    api.main.user.findUserByPhone.useMutation();

  const isFilled =
    !!watch("user_name") &&
    !!watch("phone_number") &&
    watch("checkbox") === true;

  const isFilledCompany =
    !!watch("user_name") &&
    !!watch("phone_number") &&
    !!watch("company_name") &&
    watch("checkbox") === true;

  const onSubmit = (e: Schema) => {
    if (!parsedData) return;

    const updatedLoan: Partial<Schema> = {
      ...parsedData,

      user_type: filter.user_type.toUpperCase() as "INDIVIDU" | "KORPORAT",
      user_name: e.user_name,
      phone_number: e.phone_number,
      company_name: e.company_name || "",
      jenis_pembiayaan:
        slug === "bekas" ? "Alat Berat Bekas" : "Alat Berat Baru",
      uang_muka: Number(parsedData.dpPrice),
    };

    findUserByPhone(
      { phone: e.phone_number ?? "" },
      {
        onSuccess: (value) => {
          const counter = value.data?.counter ?? 0;

          if (!value.data) {
            // user not exist → create counter
            createCounterOTP({ phone: e.phone_number ?? "" });

            sendOTP({ phone: e.phone_number ?? "" });

            localStorage.setItem(
              LOAN_DATA_HE_LOCAL_STORAGE,
              JSON.stringify(updatedLoan),
            );

            redirect(
              `${PATHS.home.pinjaman.alatBerat.base}/${slug}/verifikasi`,
            );
            return;
          }

          if (counter < 4) {
            counterUpdate({
              phone: e.phone_number ?? "",
              counter: counter + 1,
            });

            sendOTP({ phone: e.phone_number ?? "" });

            localStorage.setItem(
              LOAN_DATA_HE_LOCAL_STORAGE,
              JSON.stringify(updatedLoan),
            );

            redirect(
              `${PATHS.home.pinjaman.alatBerat.base}/${slug}/verifikasi`,
            );
          } else {
            onChangeModal("banned", true);
          }
        },
        onError: () => {
          createCounterOTP({ phone: e.phone_number ?? "" });

          sendOTP({ phone: e.phone_number ?? "" });

          localStorage.setItem(
            LOAN_DATA_HE_LOCAL_STORAGE,
            JSON.stringify(updatedLoan),
          );

          redirect(`${PATHS.home.pinjaman.alatBerat.base}/${slug}/verifikasi`);
        },
      },
    );
  };

  const { modal, onChangeModal } = useModalState();

  return (
    <Fragment>
      <OTPBanned
        show={modal.banned}
        close={() => onChangeModal("banned", false)}
      />

      <form
        onSubmit={handleSubmit((e) => onSubmit(e))}
        className="py-8 w-full flex justify-center items-center flex-col gap-5 main-padding-x"
      >
        <Progressbar progress={3} />

        <div className="w-full flex flex-col justify-center items-center">
          <Text variant="display-md">{t("title")}</Text>
          <Text variant="body-md-regular">{t("subtitle")}</Text>
        </div>

        <section className="grid grid-cols-7 gap-3 w-full">
          <Card className="col-span-3">
            <CardContent className="col-span-3 w-full flex flex-col gap-2">
              <CardTitle>
                <Text variant="display-sm">{t("summary.title")}</Text>
              </CardTitle>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <Text variant="body-md-regular">{t("summary.brand")}</Text>
                  <Text variant="body-md-medium">
                    {hyphenToPascalCase(parsedData?.brand_name ?? "")}
                  </Text>
                </div>

                <div className="flex justify-between items-center">
                  <Text variant="body-md-regular">{t("summary.model")}</Text>
                  <Text variant="body-md-medium">
                    {hyphenToPascalCase(parsedData?.model_name ?? "")}
                  </Text>
                </div>

                <div className="flex justify-between items-center">
                  <Text variant="body-md-regular">{t("summary.type")}</Text>
                  <Text variant="body-md-medium">{parsedData?.type_name}</Text>
                </div>

                <div className="flex justify-between items-center">
                  <Text variant="body-md-regular">{t("summary.year")}</Text>
                  <Text variant="body-md-medium">{parsedData?.year}</Text>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Text variant="body-md-regular">
                      {t("summary.insuranceType")}
                    </Text>
                    <TooltipProvider>
                      <Tooltip
                        open={openInsurance}
                        onOpenChange={setOpenInsurance}
                      >
                        <TooltipTrigger>
                          <Info className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-white border">
                          <section className="flex flex-col gap-3 md:w-[20vw] w-full">
                            <Text variant="body-sm-semi">
                              {p("Form.insuranceType.tooltipTitle")}
                            </Text>
                            {TOOLTIP_INSURANCE_TYPE.map(
                              (e: {
                                id: number;
                                title: LocaleContentOptional;
                                description: LocaleContentOptional;
                              }) => (
                                <div
                                  key={e.id}
                                  className={`flex-col gap-2 ${e.id === tooltip ? "flex" : "hidden"}`}
                                >
                                  <Text variant="body-sm-medium">
                                    {e.title?.[l] ?? ""}
                                  </Text>
                                  <Text variant="body-sm-regular">
                                    {e.description?.[l] ?? ""}
                                  </Text>
                                </div>
                              ),
                            )}
                            <div className="w-full flex justify-end">
                              <Text
                                variant="body-sm-regular"
                                className="flex gap-3"
                              >
                                <ArrowLeft
                                  className={`w-4 h-4 cursor-pointer ${tooltip > 1 ? "flex" : "hidden"}`}
                                  onClick={previousTooltipHandler}
                                />
                                {tooltip} {p("Form.pagination.of")}{" "}
                                {TOOLTIP_INSURANCE_TYPE.length}
                                <ArrowRight
                                  className={`w-4 h-4 cursor-pointer ${tooltip !== TOOLTIP_INSURANCE_TYPE.length ? "flex" : "hidden"}`}
                                  onClick={nextTooltipHandler}
                                />
                              </Text>
                            </div>
                          </section>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {INSURANCE_TYPE.filter(
                    (e: { value: string; label: LocaleContentOptional }) =>
                      e.value === parsedData?.insuranceType,
                  ).map(
                    (
                      e: { value: string; label: LocaleContentOptional },
                      idx: number,
                    ) => (
                      <Text variant="body-md-medium" key={idx.toString()}>
                        {e.label?.[l] ?? ""}
                      </Text>
                    ),
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <Text variant="body-md-regular">{t("summary.price")}</Text>
                  <Text variant="body-md-medium">
                    {formatCurrency(Number(parsedData?.price))}
                  </Text>
                </div>

                <div className="flex justify-between items-center">
                  <Text variant="body-md-regular">
                    {t("summary.downPayment")}
                  </Text>
                  <Text variant="body-md-medium">
                    {formatCurrency(Number(parsedData?.dpPrice))}
                  </Text>
                </div>

                <div className="flex justify-between items-center">
                  <Text variant="body-md-regular">{t("summary.loanType")}</Text>
                  <Text variant="body-md-medium">
                    {t(`summary.loanTypeValue.${slug}`)}
                  </Text>
                </div>

                <div className="flex justify-between items-center">
                  <Text variant="body-md-regular">{t("summary.location")}</Text>
                  <Text variant="body-md-medium">
                    {parsedData?.lokasi_name}
                  </Text>
                </div>

                <div className="flex justify-between items-center">
                  <Text variant="body-md-regular">
                    {t("summary.branchLocation")}
                  </Text>
                  <Text variant="body-md-medium">
                    {parsedData?.cabang_name}
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-4">
            <CardContent className="flex flex-col gap-3 w-full h-full justify-center items-start">
              <CardTitle>
                <Text variant="display-sm">{t("form.applyLoan")}</Text>
              </CardTitle>
              <Tabs
                defaultValue={filter.user_type}
                onValueChange={(e) => {
                  setValue(
                    "user_type",
                    filter.user_type.toUpperCase() as "INDIVIDU" | "KORPORAT",
                  );
                  setFilter({ user_type: e });
                }}
              >
                <TabsList className="w-full bg-transparent border-b">
                  <TabsTrigger
                    value="individu"
                    className="bg-none data-[state=active]:border-b-primary-blue rounded-none data-[state=active]:text-primary-blue text-[16px]"
                  >
                    {t("form.individu")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="korporat"
                    className="bg-none data-[state=active]:border-b-primary-blue rounded-none data-[state=active]:text-primary-blue text-[16px]"
                  >
                    {t("form.corporate")}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="individu" className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <Label>
                      {t("form.customerName")}{" "}
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      {...register("user_name")}
                      placeholder={t("form.namePlaceholder")}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label>
                      {t("form.phoneNumber")}{" "}
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      {...register("phone_number")}
                      placeholder={t("form.phonePlaceholder")}
                    />
                  </div>

                  <Controller
                    name="checkbox"
                    control={control}
                    render={({ field }) => (
                      <div className="flex gap-3 items-center justify-start">
                        <Checkbox
                          id="text"
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                        <Text variant="body-sm-regular">
                          {t("form.privacyText")}{" "}
                          <Link
                            href={PATHS.kebijakanPrivasi}
                            className="text-primary-blue underline"
                          >
                            {t("form.privacyLink")}
                          </Link>
                        </Text>
                      </div>
                    )}
                  />
                </TabsContent>
                <TabsContent value="korporat" className="flex flex-col gap-5">
                  <div className="flex flex-col gap-3">
                    <Label>
                      {t("form.customerName")}{" "}
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      {...register("user_name")}
                      placeholder={t("form.namePlaceholder")}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label>
                      {t("form.companyName")}{" "}
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      {...register("company_name")}
                      placeholder={t("form.companyPlaceholder")}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <Label>
                      {t("form.phoneNumber")}{" "}
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      {...register("phone_number")}
                      placeholder={t("form.phonePlaceholder")}
                    />
                  </div>

                  <Controller
                    name="checkbox"
                    control={control}
                    render={({ field }) => (
                      <div className="flex gap-3 items-center justify-start">
                        <Checkbox
                          id="text"
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                        />
                        <Text variant="body-sm-regular">
                          {t("form.privacyText")}{" "}
                          <Link
                            href={PATHS.kebijakanPrivasi}
                            className="text-primary-blue underline"
                          >
                            {t("form.privacyLink")}
                          </Link>
                        </Text>
                      </div>
                    )}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        <section className="w-full flex items-center justify-between">
          <Button
            type="button"
            variant="woori_outline"
            onClick={() => {
              redirect(`${PATHS.home.pinjaman.alatBerat.base}`);
            }}
          >
            {t("buttons.back")}
          </Button>
          <Button
            type="submit"
            disabled={!(isFilled || isFilledCompany) || isPending}
          >
            {t("buttons.next")}
          </Button>
        </section>
      </form>
    </Fragment>
  );
}
