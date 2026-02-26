"use client";

import { schema } from "@/server/api/schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import {
  formatCurrency,
  hyphenToPascalCase,
  toTitle,
  toTitleCase,
} from "@/lib/formatter";
import { Locale } from "next-intl";
import { Spinner } from "@/components/ui/spinner";
import { getPastCarYears } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { Text } from "@/components/html/text";
import {
  DOWN_PAYMENT_TYPE,
  INSURANCE_TYPE,
  TOOLTIP_INSURANCE_TYPE,
} from "@/lib/constants";
import { useCallback, useEffect, useState } from "react";
import { LocaleContentOptional } from "@/types";

type Schema = z.infer<typeof schema.form.loan>;

type Props = {
  l: Locale;
};

export default function UsedCarForm({ l }: Props) {
  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { isValid },
    getValues,
    setValue,
  } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema.form.loan),
    defaultValues: {
      price: 10000000,
      dpPrice: 0,
    },
  });

  const [open, setOpen] = useState<boolean>(false);
  const [openDP, setOpenDP] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<number>(1);
  const [tooltipDP, setTooltipDP] = useState<number>(1);
  const [displayAmount, setDisplayAmount] = useState(
    formatCurrency(Number(getValues("price"))),
  );
  const [displayAmountDP, setDisplayAmountDP] = useState(
    formatCurrency(Number(getValues("dpPrice"))),
  );

  const { data: location, isLoading: locationLoading } =
    api.main.loan.location.useQuery();

  const { data: branch, isLoading: branchLoading } =
    api.main.loan.branches.useQuery(
      {
        coordinateId: Number(watch("lokasi")),
      },
      { enabled: !!watch("lokasi") },
    );

  const { data: minimumPrice, isLoading: isLoadingMinPrice } =
    api.main.globalParams.getByKey.useQuery({
      key: "Car Minimum Price",
    });

  const { data: tdpPercentage, isLoading: tdpLoading } =
    api.main.globalParams.getByKey.useQuery({
      key: "TDP Percentage",
    });

  const { data: dpPercentage, isLoading: dpLoading } =
    api.main.globalParams.getByKey.useQuery({
      key: "DP Percentage",
    });

  const { data: brand, isLoading: brandLoading } = api.main.loan.brand.useQuery(
    { AssetType: "mobil" },
  );

  const { data: model, isLoading: modelLoading } = api.main.loan.model.useQuery(
    {
      AssetType: "mobil",
      PMerk: watch("brand") || "",
    },
    {
      enabled: !!watch("brand"),
    },
  );

  const { data: type, isLoading: typeLoading } = api.main.loan.type.useQuery(
    {
      AssetType: "mobil",
      PMerk: watch("brand") || "",
      PModel: watch("model") || "",
    },
    {
      enabled: !!watch("model"),
    },
  );

  const nextTooltipHandler = useCallback(() => {
    setTooltip((prev) => Math.min(prev + 1, TOOLTIP_INSURANCE_TYPE.length));
  }, []);

  const previousTooltipHandler = useCallback(() => {
    setTooltip((prev) => Math.max(prev - 1, 1));
  }, []);

  const nextTooltipHandlerDP = useCallback(() => {
    setTooltipDP((prev) => Math.min(prev + 1, DOWN_PAYMENT_TYPE.length));
  }, []);

  const previousTooltipHandlerDP = useCallback(() => {
    setTooltipDP((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Only allow numbers (no decimal point for IDR)
    const numericOnly = input.replace(/[^0-9]/g, "");

    if (numericOnly === "") {
      setDisplayAmount("");
      return;
    }

    setDisplayAmount(numericOnly);
    setValue("price", Number(numericOnly));
  };

  const handleAmountDPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Only allow numbers (no decimal point for IDR)
    const numericOnly = input.replace(/[^0-9]/g, "");

    if (numericOnly === "") {
      setDisplayAmountDP("");
      return;
    }

    setDisplayAmountDP(numericOnly);
    setValue("dpPrice", Number(numericOnly));
  };

  const dpMinAmount =
    watch("dpType") === "1"
      ? Number(dpPercentage?.data.value) * Number(watch("price"))
      : Number(tdpPercentage?.data.value) * Number(watch("price"));

  useEffect(() => {
    const dpType = watch("dpType");
    const price = watch("price");

    if (!dpType || !price) return;
    if (dpLoading || tdpLoading) return;

    const percentage =
      dpType === "1"
        ? Number(dpPercentage?.data.value)
        : Number(tdpPercentage?.data.value);

    const calculated = Math.round(percentage * price);

    setValue("dpPrice", calculated);
    setDisplayAmountDP(formatCurrency(calculated));
  }, [watch("dpType"), dpPercentage, tdpPercentage]);

  const isFilled =
    watch("lokasi") &&
    watch("cabang") &&
    watch("brand") &&
    watch("model") &&
    watch("type") &&
    watch("year") &&
    watch("insuranceType") &&
    watch("price") &&
    watch("dpType") &&
    watch("dpPrice");

  console.log(isFilled, " ======== ");

  return (
    <form onSubmit={() => {}} className="w-full pt-10 flex flex-col gap-5">
      <Controller
        name="lokasi"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-3">
            <Label>Your Location</Label>
            <Select
              value={field.value ? String(field.value) : undefined}
              onValueChange={field.onChange}
              disabled={locationLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose you location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {location?.data.map((e) => (
                    <SelectItem key={e.id.toString()} value={e.id.toString()}>
                      {toTitleCase(e.name ?? "")}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <Controller
        name="cabang"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-3">
            <Label>Branch Location</Label>
            <Select
              value={field.value ? String(field.value) : undefined}
              onValueChange={field.onChange}
              disabled={!watch("lokasi") || branchLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose branch location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {branch?.data.map((e) => (
                    <SelectItem key={e.id.toString()} value={e.name![l]}>
                      {e.name?.[l] ?? ""}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-3">
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-3 w-full">
              <Label>Car Brand</Label>
              <Select
                value={field.value ? String(field.value) : undefined}
                onValueChange={field.onChange}
                disabled={brandLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose car brand" />
                </SelectTrigger>
                <SelectContent>
                  {brandLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                      <Spinner />
                    </div>
                  ) : (
                    <SelectGroup>
                      {brand?.data.data.map((e, idx: number) => (
                        <SelectItem key={idx.toString()} value={e.AssetMerk}>
                          {toTitle(e.AssetMerkName ?? "")}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
        />

        <Controller
          name="model"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-3 w-full">
              <Label>Car Model</Label>
              <Select
                value={field.value ? String(field.value) : undefined}
                onValueChange={field.onChange}
                disabled={!watch("brand") || modelLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose car model" />
                </SelectTrigger>
                <SelectContent>
                  {modelLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                      <Spinner />
                    </div>
                  ) : (
                    <SelectGroup>
                      {model?.data.data.map((e, idx: number) => (
                        <SelectItem key={idx.toString()} value={e.AssetModel}>
                          {hyphenToPascalCase(e.AssetModelName)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-3">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-3 w-full">
              <Label>Car Type</Label>
              <Select
                value={field.value ? String(field.value) : undefined}
                onValueChange={field.onChange}
                disabled={!watch("model") || typeLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose car type" />
                </SelectTrigger>
                <SelectContent>
                  {typeLoading ? (
                    <div className="w-full h-full flex justify-center items-center">
                      <Spinner />
                    </div>
                  ) : (
                    <SelectGroup>
                      {type?.data.data.map((e, idx: number) => (
                        <SelectItem
                          key={idx.toString()}
                          value={e.AssetType}
                          className="truncate"
                        >
                          {e.AssetTypeName ?? ""}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
        />

        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-3 w-full">
              <Label>Car Year</Label>
              <Select
                value={field.value ? String(field.value) : undefined}
                onValueChange={field.onChange}
                disabled={!watch("type")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose car year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {getPastCarYears(10).map((e) => (
                      <SelectItem key={e.value} value={e.value}>
                        {e.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>

      <Controller
        name="insuranceType"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <Label>Tipe Asuransi</Label>
              <TooltipProvider>
                <Tooltip open={open} onOpenChange={setOpen}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setOpen((prev) => !prev)}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border">
                    <section className="flex flex-col gap-3 md:w-[20vw] w-full">
                      <Text variant="body-sm-semi">Jenis Asuransi</Text>
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
                        <Text variant="body-sm-regular" className="flex gap-3">
                          <ArrowLeft
                            className={`w-4 h-4 cursor-pointer ${tooltip > 1 ? "flex" : "hidden"}`}
                            onClick={previousTooltipHandler}
                          />
                          {tooltip} dari {TOOLTIP_INSURANCE_TYPE.length}
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
            <Select
              value={field.value ? String(field.value) : undefined}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose insurance type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {INSURANCE_TYPE.map(
                    (e: { value: string; label: LocaleContentOptional }) => (
                      <SelectItem key={e.value} value={e.value}>
                        {e.label?.[l]}
                      </SelectItem>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <div className="flex flex-col gap-3">
        <Label>Car Price</Label>
        <Input
          {...register("price")}
          value={displayAmount}
          placeholder="Rp 2.000.000"
          className="w-full"
          onChange={handleAmountChange}
          onBlur={() => {
            if (displayAmount) {
              setDisplayAmount(formatCurrency(Number(displayAmount)));
            }
          }}
          onFocus={() => {
            const raw = displayAmount.replace(/[^0-9]/g, "");
            setDisplayAmount(raw);
          }}
        />
        {!isLoadingMinPrice &&
          Number(watch("price")) > 0 &&
          Number(watch("price")) < Number(minimumPrice?.data.value) && (
            <Text variant="caption-md-regular" color="error">
              {`Harga mobil minimal ${formatCurrency(Number(minimumPrice?.data.value ?? 0))}`}
            </Text>
          )}
      </div>

      <Controller
        name="dpType"
        control={control}
        render={({ field }) => (
          <section className="flex w-full flex-col gap-3">
            <div className="flex items-center gap-2">
              <Label>Jumlah Uang Muka</Label>
              <TooltipProvider>
                <Tooltip open={openDP} onOpenChange={setOpenDP}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => setOpenDP((prev) => !prev)}
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-white border">
                    <section className="flex flex-col gap-3 md:w-[20vw] w-full">
                      {DOWN_PAYMENT_TYPE.map(
                        (e: {
                          value: string;
                          label: LocaleContentOptional;
                          title: LocaleContentOptional;
                          description: LocaleContentOptional;
                        }) => (
                          <div
                            key={e.value}
                            className={`flex-col gap-2 ${Number(e.value) === tooltipDP ? "flex" : "hidden"}`}
                          >
                            <Text variant="body-sm-medium">
                              {e.title?.[l] ?? ""} ({e.label?.[l]})
                            </Text>
                            <Text variant="body-sm-regular">
                              {e.description?.[l] ?? ""}
                            </Text>
                          </div>
                        ),
                      )}
                      <div className="w-full flex justify-end">
                        <Text variant="body-sm-regular" className="flex gap-3">
                          <ArrowLeft
                            className={`w-4 h-4 cursor-pointer ${tooltipDP > 1 ? "flex" : "hidden"}`}
                            onClick={previousTooltipHandlerDP}
                          />
                          {tooltipDP} dari {DOWN_PAYMENT_TYPE.length}
                          <ArrowRight
                            className={`w-4 h-4 cursor-pointer ${tooltipDP !== DOWN_PAYMENT_TYPE.length ? "flex" : "hidden"}`}
                            onClick={nextTooltipHandlerDP}
                          />
                        </Text>
                      </div>
                    </section>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
              <Select
                value={field.value ? String(field.value) : undefined}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full col-span-1">
                  <SelectValue placeholder="Choose DP type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {DOWN_PAYMENT_TYPE.map(
                      (e: { value: string; label: LocaleContentOptional }) => (
                        <SelectItem
                          key={e.value}
                          value={e.value}
                          className="w-72"
                        >
                          {e.label?.[l]}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input
                {...register("dpPrice")}
                disabled={!watch("dpType")}
                placeholder="Rp 5.000.000"
                value={displayAmountDP}
                className="w-full col-span-2"
                onChange={handleAmountDPChange}
                onBlur={() => {
                  if (displayAmountDP) {
                    setDisplayAmountDP(formatCurrency(Number(displayAmountDP)));
                  }
                }}
                onFocus={() => {
                  const raw = displayAmountDP.replace(/[^0-9]/g, "");
                  setDisplayAmountDP(raw);
                }}
              />
            </div>
          </section>
        )}
      />

      {Number(watch("dpPrice")) < Number(dpMinAmount.toFixed()) &&
        Number(watch("dpPrice")) < Number(watch("price")) && (
          <Text
            variant="caption-md-regular"
            color="error"
          >{`Uang muka minimal ${formatCurrency(dpMinAmount)}`}</Text>
        )}

      {tdpLoading && dpLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : watch("dpType") === "1" ? (
        <Text variant="caption-md-regular" color="muted">
          {`Minimum uang muka sebanyak ${Number(dpPercentage?.data.value) * 100}% masukan jumlah sedikitnya ${formatCurrency(dpMinAmount)}`}
        </Text>
      ) : (
        <Text variant="caption-md-regular" color="muted">
          {`Silahkan masukkan uang muka minimum sebesar ${formatCurrency(dpMinAmount)}`}
        </Text>
      )}
      <div className="w-full flex justify-end">
        <Button className="right-0" disabled={!isValid && !isFilled}>
          Estimate Loan
        </Button>
      </div>
    </form>
  );
}
