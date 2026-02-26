import { schema } from "../schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ERROR_CREATE_DATA, ERROR_FETCH } from "@/lib/constants";
import {
  branches,
  coordinates,
  loanSimulations,
} from "@/drizzle/migrations/schema";
import { asc, sql } from "drizzle-orm";
import { z } from "zod";
import { env } from "@/env.mjs";

export const simulationLoanRouter = createTRPCRouter({
  create: publicProcedure
    .input(schema.loan.create)
    .mutation(async ({ ctx, input }) => {
      const data = await ctx.db.insert(loanSimulations).values({
        userType: input.user_type,
        email: input.email,
        phoneNumber: input.phone_number,
        companyName: input.company_name,
        loanTypeId: input.loan_type_id,
        carPrice: input.car_price,
        clientLocation: input.client_location,
        carBrand: input.car_brand,
        carModel: input.car_model,
        carType: input.car_type,
        carYear: input.car_year,
        insuranceType: input.insurance_type,
        tdpPrice: input.tdp_price,
        dpPrice: input.dp_price,
        tenorMonth: input.tenor_month,
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
    console.log(result);

    return { data: result };
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

    return { data: await data.json() };
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

    return { data: await data.json() };
  }),

  //   tenor: publicProcedure
  //     .input(schema.shared.loan)
  //     .mutation(async ({ input }) => {
  //       const {
  //         jenis,
  //         cabang,
  //         price,
  //         dpPrice,
  //         year,
  //         dpType,
  //         insuranceType,
  //         model,
  //       } = input;
  //
  //       const data = await fetch(`${env.MAXI_LOAN_URL}/api/loan/getTenure`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           cabang,
  //           platwill: null,
  //           tenor: 12,
  //           thn_kndrn: Number(year),
  //           model_kendaraan: model,
  //           kondisi: jenis,
  //           jenisDP: dpType,
  //           asuransi_kendaraan: insuranceType,
  //           totalDP: Number(dpPrice),
  //           totalOtr: Number(price),
  //         }),
  //       });
  //
  //       if (!data.ok)
  //         throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });
  //
  //       return { data: await data.json() };
  //     }),
});
