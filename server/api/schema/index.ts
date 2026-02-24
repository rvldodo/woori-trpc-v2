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
      name: z.string().min(1, "Name is required"),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),
      type: z.string().min(1, "Complaint type is required"),
      message: z.string().min(1, "Message is required"),
    }),
  };

  static promo = {
    subscription: z.object({
      user_type: z.string(),
      name: z.string(),
      company: z.string().optional(),
      phone: z.string().min(10),
      promo_id: z.number(),
    }),
  };
}
