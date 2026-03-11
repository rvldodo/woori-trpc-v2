import { schema } from "../schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ERROR_CREATE_DATA, ERROR_FETCH } from "@/lib/constants";
import {
  branches,
  coordinates,
  loanSimulations,
  loanTypes,
} from "@/drizzle/migrations/schema";
import { and, asc, eq, sql, SQLWrapper } from "drizzle-orm";
import { z } from "zod";
import { env } from "@/env.mjs";
import { CarBrand, CarModel, CarType, Tenor } from "@/types/loan";
import { hyphenToPascalCase } from "@/lib/formatter";

export const simulationLoanRouter = createTRPCRouter({
  create: publicProcedure
    .input(schema.form.loan)
    .mutation(async ({ ctx, input }) => {
      const [loanType] = await ctx.db
        .select()
        .from(loanTypes)
        .where(
          eq(loanTypes.name, hyphenToPascalCase(input.jenis_pembiayaan ?? "")),
        );

      const [data] = await ctx.db
        .insert(loanSimulations)
        .values({
          userType: input.user_type as "INDIVIDU" | "KORPORAT",
          email: input.user_name,
          phoneNumber: input.phone_number,
          companyName: input.company_name,
          loanTypeId: Number(loanType.id),
          carPrice: input.price,
          clientLocation: input.lokasi_name,
          carBrand: input.brand_name,
          carModel: input.model_name,
          carType: input.type_name,
          carYear: input.year ? Number(input.year) : null,
          insuranceType: input.insuranceType,
          tdpPrice: input.total_uang_muka,
          dpPrice: input.uang_muka,
          tenorMonth: input.tenor,
          name: input.user_name,
          branchId: Number(input.cabang),
        })
        .returning();

      if (!data)
        throw new TRPCError({
          message: ERROR_CREATE_DATA,
          code: "BAD_REQUEST",
        });

      return { data };
    }),

  create_he: publicProcedure
    .input(schema.loan.create_he)
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.insert(loanSimulations).values({
        userType: input.user_type,
        email: input.email,
        phoneNumber: input.phone_number,
        companyName: input.company_name,
        loanTypeId: input.loan_type_id,
        carPrice: input.car_price,
        carBrand: input.car_brand,
        carModel: input.car_model,
        carType: input.car_type,
        carYear: input.car_year,
        insuranceType: input.insurance_type,
        tdpPrice: input.tdp_price,
        dpPrice: input.dp_price,
        name: input.name,
        branchId: input.branch_id,
      });

      if (!data)
        throw new TRPCError({
          message: ERROR_CREATE_DATA,
          code: "BAD_REQUEST",
        });

      return { data };
    }),

  location: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select({
        id: coordinates.id,
        name: coordinates.title,
        id_location: coordinates.idLocation,
      })
      .from(coordinates)
      .orderBy(asc(coordinates.id));

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data };
  }),

  location_he: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select({
        id: coordinates.id,
        name: coordinates.title,
        id_location: coordinates.idLocation,
      })
      .from(coordinates)
      .innerJoin(
        branches,
        sql`${coordinates.id} = ANY(${branches.coordinateId})`,
      )
      .where(eq(branches.type, "HE"))
      .orderBy(asc(coordinates.id));

    return { data };
  }),

  branches: publicProcedure
    .input(z.object({ coordinateId: z.number() }))
    .query(async ({ input, ctx }) => {
      const { coordinateId } = input;

      const data = await ctx.db
        .select()
        .from(branches)
        .where(sql`${coordinateId} = ANY(${branches.coordinateId})`);

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "NOT_FOUND" });

      return { data };
    }),

  branches_he: publicProcedure
    .input(z.object({ coordinateId: z.number() }))
    .query(async ({ input, ctx }) => {
      const conditions: (SQLWrapper | undefined)[] = [
        sql`${input.coordinateId} = ANY(${branches.coordinateId})`,
        eq(branches.type, "HE"),
      ];

      const data = await ctx.db
        .select()
        .from(branches)
        .where(and(...conditions));

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "NOT_FOUND" });

      return { data };
    }),

  brand: publicProcedure.input(schema.loan.brand).query(async ({ input }) => {
    const { AssetType } = input;

    const data = await fetch(`${env.MAXI_LOAN_URL}/api/loan/getBrand`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ AssetType }),
    });

    if (!data.ok)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    const result = await data.json();

    return { data: result.data as CarBrand[] };
  }),

  model: publicProcedure.input(schema.loan.model).query(async ({ input }) => {
    const { AssetType, PMerk } = input;

    const data = await fetch(`${env.MAXI_LOAN_URL}/api/loan/getModel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ AssetType, PMerk }),
    });

    if (!data.ok)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    const result = await data.json();

    return { data: result.data as CarModel[] };
  }),

  type: publicProcedure.input(schema.loan.type).query(async ({ input }) => {
    const { AssetType, PMerk, PModel } = input;

    const data = await fetch(`${env.MAXI_LOAN_URL}/api/loan/getType`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ AssetType, PMerk, PModel }),
    });

    if (!data.ok)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    const result = await data.json();

    return { data: result.data as CarType[] };
  }),

  tenor: publicProcedure.input(schema.form.loan).query(async ({ input }) => {
    const {
      jenis,
      cabang,
      price,
      dpPrice,
      year,
      dpType,
      insuranceType,
      model,
    } = input;

    const data = await fetch(`${env.MAXI_LOAN_URL}/api/loan/getTenure`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cabang,
        platwill: null,
        tenor: 12,
        thn_kndrn: Number(year),
        model_kendaraan: model,
        kondisi: jenis,
        jenisDP: dpType,
        asuransi_kendaraan: insuranceType,
        totalDP: Number(dpPrice),
        totalOtr: Number(price),
      }),
    });

    if (!data.ok)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    const result = await data.json();

    return { data: result.data as Tenor[] };
  }),
});
