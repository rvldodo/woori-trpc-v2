"use client";

import { Locale } from "next-intl";
import Progressbar from "../../../_components/progress-bar";
import { Text } from "@/components/html/text";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseAsInteger, parseAsStringEnum, useQueryStates } from "nuqs";
import { LOAN_DATA_LOCAL_STORAGE, TDP_TOOLTIP } from "@/lib/constants";
import { schema } from "@/server/api/schema";
import z from "zod";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { Spinner } from "@/components/ui/spinner";
import TenorCard from "../_components/tenor-card";
import { Info, Volume2 } from "lucide-react";
import {
  formatCurrency,
  hyphenToPascalCase,
  toTitle,
  toTitleCase,
} from "@/lib/formatter";
import { Tenor } from "@/types/loan";
import { useDebounce } from "@uidotdev/usehooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LocaleContentOptional } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  l: Locale;
  slug: string;
};

type Schema = z.infer<typeof schema.form.loan>;

export default function HasilSimulasiSection({ l, slug }: Props) {
  const [openTDP, setOpenTDP] = useState<boolean>(false);
  const [selectedTenor, setSelectedTenor] = useState<null | Tenor>(null);

  // NOTE: AD -> ADDM (tenor - 1), AR -> ADDB (tenor)
  const [filter, setFilter] = useQueryStates({
    tipe_pembayaran: parseAsStringEnum(["AD", "AR"]).withDefault("AD"),
    tenor: parseAsInteger.withDefault(12),
  });

  const [parsedData, setParsedData] = useState<Partial<Schema> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LOAN_DATA_LOCAL_STORAGE);
    if (!saved) return;
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

  console.log(filteredData, " ====== filtered data ");

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

  return (
    <article className="py-8 w-full flex justify-center items-center flex-col gap-5 main-padding-x">
      <Progressbar progress={2} />

      <div className="w-full flex flex-col justify-center items-center">
        <Text variant="display-md">Hasil Simulasi</Text>
        <Text variant="body-md-regular">
          Pilih tenor dan jenis pembayaran yang Anda inginkan
        </Text>
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
                      <strong>Bayar di Awal:</strong> Angsuran pertama
                      dibayarkan bersama DP, sehingga durasi Pembiayaan
                      berkurang satu bulan.
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
                      <strong>Bayar di Akhir:</strong> Angsuran pertama
                      dibayarkan di akhir bula, mengurangi TDP namun durasi
                      pinjaman tetap sama.
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
          <Accordion type="single">
            <AccordionItem value="1">
              <CardContent className="col-span-3 w-full flex flex-col gap-2">
                <CardTitle>
                  <Text variant="display-sm">Hasil Simulasi</Text>
                  <div className="flex w-full items-center bg-background-hover gap-3 p-3 rounded-lg">
                    <Volume2 className="w-7 h-7" />
                    <Text variant="caption-md-regular">
                      Estimasi ini dapat berubah tergantung pada keputusan akhir
                      selama proses Pengajuan Pembiayaan.
                    </Text>
                  </div>
                </CardTitle>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <Text variant="body-md-regular">Harga Kendaraan</Text>
                    <Text variant="body-md-medium">
                      {formatCurrency(Number(selectedTenor?.OTR))}
                    </Text>
                  </div>

                  <div className="flex justify-between items-center">
                    <Text variant="body-md-regular">Uang Muka</Text>
                    <Text variant="body-md-medium">
                      {formatCurrency(Number(selectedTenor?.DP))}
                    </Text>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <Text variant="body-md-regular">Total Uang Muka</Text>
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
                                  <div
                                    key={e.id}
                                    className={`flex flex-col gap-2`}
                                  >
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
                    <Text variant="body-md-regular">Tenor</Text>
                    <Text variant="body-md-medium">{filter.tenor} bulan</Text>
                  </div>

                  <div className="flex justify-between items-center">
                    <Text variant="body-md-regular">Angsuran per Bulan</Text>
                    <Text variant="body-md-medium">
                      {formatCurrency(Number(selectedTenor?.Angsuran))}
                    </Text>
                  </div>

                  <div className="flex justify-between items-center">
                    <Text variant="body-md-regular">Jenis Angsuran</Text>
                    <Text variant="body-md-medium">
                      {filter.tipe_pembayaran === "AR" ? "ADDB" : "ADDM"}
                    </Text>
                  </div>

                  <div className="flex justify-between items-center">
                    <Text variant="body-md-regular">Jenis Pembiayaan</Text>
                    <Text variant="body-md-medium">{toTitleCase(slug)}</Text>
                  </div>
                </div>

                <AccordionTrigger className="flex items-center">
                  <Text variant="display-sm">Detail Kendaraan</Text>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex justify-between items-center">
                    <Text variant="body-md-regular">Merek Kendaraan</Text>
                    <Text variant="body-md-medium">
                      {hyphenToPascalCase(parsedData.brand ?? "")}
                    </Text>
                  </div>

                  <div className="flex justify-between items-center">
                    <Text variant="body-md-regular">Model Kendaraan</Text>
                    <Text variant="body-md-medium">
                      {hyphenToPascalCase(parsedData.model ?? "")}
                    </Text>
                  </div>

                  <div className="flex justify-between items-center">
                    <Text variant="body-md-regular">Tipe Kendaraan</Text>
                    <Text variant="body-md-medium">{parsedData.type}</Text>
                  </div>

                  <div className="flex justify-between items-center">
                    <Text variant="body-md-regular">Tahun Kendaraan</Text>
                    <Text variant="body-md-medium">{parsedData.year}</Text>
                  </div>

                  <div className="flex justify-between items-center">
                    <Text variant="body-md-regular">Tenor</Text>
                    <Text variant="body-md-medium">{filter.tenor} bulan</Text>
                  </div>

                  <div className="flex justify-between items-center">
                    <Text variant="body-md-regular">Tenor</Text>
                    <Text variant="body-md-medium">{filter.tenor} bulan</Text>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <Text variant="body-md-regular">Total Uang Muka</Text>
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
                                  <div
                                    key={e.id}
                                    className={`flex flex-col gap-2`}
                                  >
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
                </AccordionContent>
              </CardContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </section>
    </article>
  );
}
