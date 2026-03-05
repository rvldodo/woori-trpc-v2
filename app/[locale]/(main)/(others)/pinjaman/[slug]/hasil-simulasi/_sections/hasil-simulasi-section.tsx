"use client";

import { type Locale, useTranslations } from "next-intl";
import Progressbar from "../../../_components/progress-bar";
import { Text } from "@/components/html/text";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseAsInteger, parseAsStringEnum, useQueryStates } from "nuqs";
import {
  INSURANCE_TYPE,
  LOAN_DATA_LOCAL_STORAGE,
  TDP_TOOLTIP,
  TOOLTIP_INSURANCE_TYPE,
} from "@/lib/constants";
import type { schema } from "@/server/api/schema";
import type z from "zod";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/ui/spinner";
import TenorCard from "../_components/tenor-card";
import { ArrowLeft, ArrowRight, Info, Volume2 } from "lucide-react";
import {
  formatCurrency,
  hyphenToPascalCase,
  toTitleCase,
} from "@/lib/formatter";
import type { Tenor } from "@/types/loan";
import { useDebounce } from "@uidotdev/usehooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { LocaleContentOptional } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { PATHS } from "@/app/urls";

type Props = {
  l: Locale;
  slug: string;
};

type Schema = z.infer<typeof schema.form.loan>;

export default function HasilSimulasiSection({ l, slug }: Props) {
  const t = useTranslations("HasilSimulasi");
  const p = useTranslations();

  const [openTDP, setOpenTDP] = useState<boolean>(false);
  const [openInsurance, setOpenInsurance] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<number>(1);
  const [selectedTenor, setSelectedTenor] = useState<null | Tenor>(null);

  const nextTooltipHandler = useCallback(() => {
    setTooltip((prev) => Math.min(prev + 1, TOOLTIP_INSURANCE_TYPE.length));
  }, []);

  const previousTooltipHandler = useCallback(() => {
    setTooltip((prev) => Math.max(prev - 1, 1));
  }, []);

  const [parsedData, setParsedData] = useState<Partial<Schema> | null>(null);

  // NOTE: AD -> ADDM (tenor - 1), AR -> ADDB (tenor)
  const [filter, setFilter] = useQueryStates({
    tipe_pembayaran: parseAsStringEnum(["AD", "AR"]).withDefault("AD"),
    tenor: parseAsInteger.withDefault(
      parsedData?.tenor ? parsedData.tenor : 11,
    ),
  });

  useEffect(() => {
    const saved = localStorage.getItem(LOAN_DATA_LOCAL_STORAGE);
    if (!saved) redirect(PATHS.home.base);
    setParsedData(JSON.parse(saved));
  }, []);

  const debounce = useDebounce(parsedData, 1000);

  const { data, isLoading } = api.main.loan.tenor.useQuery(debounce as Schema, {
    enabled: !!debounce,
    refetchOnWindowFocus: false,
  });

  const filteredData = data?.data.filter(
    (e) => e.FirstPayment === filter.tipe_pembayaran,
  );

  useEffect(() => {
    if (!data?.data) return;
    const found = data.data.find((e) =>
      filter.tipe_pembayaran === "AD"
        ? e.Tenor - 1 === filter.tenor
        : e.Tenor === filter.tenor,
    );
    setSelectedTenor(found ?? data.data[0] ?? null);
  }, [data, filter.tenor, filter.tipe_pembayaran]);

  if (!parsedData) return null;

  const handleNext = () => {
    if (!parsedData || !selectedTenor) return;

    const updatedLoan = {
      ...parsedData,

      // installment type (ADDM / ADDB)
      jenis_angsuran: filter.tipe_pembayaran === "AR" ? "ADDB" : "ADDM",

      // financing type (slug)
      jenis_pembiayaan: slug,

      // selected tenor
      tenor: filter.tenor,

      // down payment
      uang_muka: Number(selectedTenor?.DP) ?? null,

      // total down payment
      total_uang_muka: Number(selectedTenor?.TDP) ?? null,

      // installment per month
      angsuran_per_bulan: Number(selectedTenor?.Angsuran) ?? null,
    };

    localStorage.setItem(LOAN_DATA_LOCAL_STORAGE, JSON.stringify(updatedLoan));

    redirect(`${PATHS.home.pinjaman.base}/${slug}/pengajuan-pinjaman`);
  };

  console.log(parsedData);

  return (
    <article className="py-8 w-full flex justify-center items-center flex-col gap-5 main-padding-x">
      <Progressbar progress={2} />

      <div className="w-full flex flex-col justify-center items-center">
        <Text variant="display-md">{t("title")}</Text>
        <Text variant="body-md-regular">{t("subtitle")}</Text>
      </div>

      <section className="grid grid-cols-5 gap-3 w-full">
        <Card className="col-span-3">
          <CardContent className="col-span-3 w-full">
            <CardTitle></CardTitle>
            <Tabs
              defaultValue={filter.tipe_pembayaran}
              onValueChange={(e) => {
                setFilter({ tipe_pembayaran: e as "AD" | "AR" });
                const found = data?.data.find((e) =>
                  filter.tipe_pembayaran === "AD"
                    ? e.Tenor - 1 === filter.tenor
                    : e.Tenor === filter.tenor,
                );
                setSelectedTenor(found ?? null);
              }}
            >
              <TabsList
                className="flex rounded-none border-b-2 border-b-muted w-full bg-transparent"
                defaultValue="AD"
              >
                <TabsTrigger
                  value="AD"
                  className="data-[state=active]:border-b-primary w-full flex rounded-none justify-center items-center data-[state=active]:text-primary-blue"
                >
                  ADDM
                </TabsTrigger>

                <TabsTrigger
                  value="AR"
                  className="data-[state=active]:border-b-primary w-full flex rounded-none justify-center items-center data-[state=active]:text-primary-blue"
                >
                  ADDB
                </TabsTrigger>
              </TabsList>

              {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  <TabsContent value="AD" className="flex flex-col gap-3">
                    <Text variant="body-md-regular">
                      <strong>{t("tabs.payInAdvanceTitle")}</strong>{" "}
                      {t("tabs.payInAdvanceDescription")}
                    </Text>
                    {filteredData?.map((e, idx: number) => (
                      <TenorCard
                        key={idx.toString()}
                        month={e.Tenor - 1}
                        amount={e.Angsuran}
                        onClick={() => setFilter({ tenor: e.Tenor - 1 })}
                        isActive={filter.tenor === e.Tenor - 1}
                      />
                    ))}
                  </TabsContent>

                  <TabsContent value="AR" className="flex flex-col gap-3">
                    <Text variant="body-md-regular">
                      <strong>{t("tabs.payInEndTitle")}</strong>{" "}
                      {t("tabs.payInEndDescription")}
                    </Text>
                    {filteredData?.map((e, idx: number) => (
                      <TenorCard
                        key={idx.toString()}
                        month={e.Tenor}
                        amount={e.Angsuran}
                        onClick={() => setFilter({ tenor: e.Tenor })}
                        isActive={filter.tenor === e.Tenor}
                      />
                    ))}
                  </TabsContent>
                </>
              )}
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardContent className="col-span-3 w-full flex flex-col gap-2">
            <CardTitle>
              <Text variant="display-sm">{t("summary.title")}</Text>
              <div className="flex w-full items-center bg-background-hover gap-3 p-3 rounded-lg">
                <Volume2 className="w-7 h-7" />
                <Text variant="caption-md-regular">
                  {t("summary.estimationNote")}
                </Text>
              </div>
            </CardTitle>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <Text variant="body-md-regular">
                  {t("summary.vehiclePrice")}
                </Text>
                <Text variant="body-md-medium">
                  {formatCurrency(Number(selectedTenor?.OTR))}
                </Text>
              </div>

              <div className="flex justify-between items-center">
                <Text variant="body-md-regular">
                  {t("summary.downPayment")}
                </Text>
                <Text variant="body-md-medium">
                  {formatCurrency(Number(selectedTenor?.DP))}
                </Text>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Text variant="body-md-regular">
                    {t("summary.totalDownPayment")}
                  </Text>
                  <TooltipProvider>
                    <Tooltip open={openTDP} onOpenChange={setOpenTDP}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setOpenTDP((prev) => !prev)}
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-white border">
                        <section className="flex flex-col gap-3 md:w-[20vw] w-full">
                          {TDP_TOOLTIP.map(
                            (e: {
                              id: number;
                              title: LocaleContentOptional;
                              description: LocaleContentOptional;
                            }) => (
                              <div key={e.id} className={`flex flex-col gap-2`}>
                                <Text variant="body-sm-medium">
                                  {e.title?.[l]}
                                </Text>
                                <Text variant="body-sm-regular">
                                  {e.description?.[l] ?? ""}
                                </Text>
                              </div>
                            ),
                          )}
                        </section>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <Text variant="body-md-medium">
                  {formatCurrency(Number(selectedTenor?.TDP))}
                </Text>
              </div>

              <div className="flex justify-between items-center">
                <Text variant="body-md-regular">{t("summary.tenor")}</Text>
                <Text variant="body-md-medium">
                  {filter.tenor} {t("summary.month")}
                </Text>
              </div>

              <div className="flex justify-between items-center">
                <Text variant="body-md-regular">
                  {t("summary.installmentPerMonth")}
                </Text>
                <Text variant="body-md-medium">
                  {formatCurrency(Number(selectedTenor?.Angsuran))}
                </Text>
              </div>

              <div className="flex justify-between items-center">
                <Text variant="body-md-regular">
                  {t("summary.installmentType")}
                </Text>
                <Text variant="body-md-medium">
                  {filter.tipe_pembayaran === "AR" ? "ADDB" : "ADDM"}
                </Text>
              </div>

              <div className="flex justify-between items-center">
                <Text variant="body-md-regular">
                  {t("summary.financingType")}
                </Text>
                <Text variant="body-md-medium">{toTitleCase(slug)}</Text>
              </div>
            </div>

            <Accordion type="single" defaultValue="1">
              <AccordionItem value="1">
                <AccordionTrigger className="flex items-center hover:no-underline">
                  <Text variant="display-sm" color="primary">
                    {t("accordion.vehicleDetail")}
                  </Text>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="leading-none text-[16px] font-normal">
                        {t("accordion.brand")}
                      </span>
                      <Text variant="body-md-medium">
                        {hyphenToPascalCase(parsedData.brand_name ?? "")}
                      </Text>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="leading-none text-[16px] font-normal">
                        {t("accordion.model")}
                      </span>
                      <Text variant="body-md-medium">
                        {hyphenToPascalCase(parsedData.model_name ?? "")}
                      </Text>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="leading-none text-[16px] font-normal">
                        {t("accordion.type")}
                      </span>
                      <Text variant="body-md-medium" className="text-end">
                        {parsedData.type_name}
                      </Text>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="leading-none text-[16px] font-normal">
                        {t("accordion.year")}
                      </span>
                      <Text variant="body-md-medium">{parsedData.year}</Text>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="leading-none text-[16px] font-normal">
                        {t("accordion.location")}
                      </span>
                      <Text variant="body-md-medium">
                        {parsedData.lokasi_name}
                      </Text>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="leading-none text-[16px] font-normal">
                        {t("accordion.branchLocation")}
                      </span>
                      <Text variant="body-md-medium">
                        {parsedData.cabang_name}
                      </Text>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <span className="leading-none text-[16px] font-normal">
                          {t("accordion.insuranceType")}
                        </span>
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
                          e.value === parsedData.insuranceType,
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
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <section className="w-full flex items-center justify-between">
        <Button
          type="button"
          variant="woori_outline"
          onClick={() => {
            redirect(`${PATHS.home.pinjaman.base}/${slug}`);
          }}
        >
          {t("buttons.back")}
        </Button>
        <Button type="button" onClick={() => handleNext()}>
          {t("buttons.next")}
        </Button>
      </section>
    </article>
  );
}
