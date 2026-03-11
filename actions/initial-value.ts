import {
  LOAN_DATA_HE_LOCAL_STORAGE,
  LOAN_DATA_LOCAL_STORAGE,
} from "@/lib/constants";
import type { schema } from "@/server/api/schema";
import type z from "zod";

type Schema = z.infer<typeof schema.form.loan>;

export const getInitialValues = (): Partial<Schema> => {
  if (typeof window === "undefined") return {};

  const saved = localStorage.getItem(LOAN_DATA_LOCAL_STORAGE);
  if (!saved) return {};

  try {
    const parsed = JSON.parse(saved) as Schema;

    return {
      lokasi: parsed.lokasi,
      lokasi_name: parsed.lokasi_name,
      cabang: parsed.cabang,
      brand: parsed.brand,
      brand_name: parsed.brand_name,
      model: parsed.model,
      model_name: parsed.model_name,
      type: parsed.type,
      type_name: parsed.type_name,
      year: parsed.year,
      insuranceType: parsed.insuranceType,
      price: parsed.price ?? 10000000,
      dpType: parsed.dpType,
      dpPrice: parsed.dpPrice,
    };
  } catch {
    return {};
  }
};

export const getInitialValuesHE = (): Partial<Schema> => {
  if (typeof window === "undefined") return {};

  const saved = localStorage.getItem(LOAN_DATA_HE_LOCAL_STORAGE);
  if (!saved) return {};

  try {
    const parsed = JSON.parse(saved) as Schema;

    return {
      lokasi: parsed.lokasi,
      lokasi_name: parsed.lokasi_name,
      cabang: parsed.cabang,
      brand: parsed.brand,
      brand_name: parsed.brand_name,
      model: parsed.model,
      model_name: parsed.model_name,
      type: parsed.type,
      type_name: parsed.type_name,
      year: parsed.year?.toString(),
      insuranceType: parsed.insuranceType,
      price: parsed.price ?? 10000000,
      dpType: parsed.dpType,
      dpPrice: parsed.dpPrice,
    };
  } catch {
    return {};
  }
};
