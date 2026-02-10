import { PAGINATION_LIMIT } from "@/lib/constants";
import z from "zod";

export class schema {
  static shared = {
    pagination: z.object({
      limit: z.coerce.number().positive().default(PAGINATION_LIMIT),
      page: z.coerce.number().positive().min(1).default(1),
    }),
  };

  static form = {
    loan: z.object({
      jenis: z.string().nullable(),
      lokasi: z.string().nullable(),
      cabang: z.string().nullable(),
      brand: z.string().nullable(),
      model: z.string().nullable(),
      type: z.string().nullable(),
      insuranceType: z.string().nullable(),
      dpPrice: z.number().nullable(),
      year: z.string().nullable(),
      price: z.number().nullable(),
      dpType: z.string().nullable(),
    }),
  };

  static complaint = {
    complaint_form: z.object({
      name: z.string(),
      email: z.string(),
      type: z.string(),
      message: z.string(),
    }),
  };
}
