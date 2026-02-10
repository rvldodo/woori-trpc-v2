import {
  loanTypes,
  promos,
  promoSubscription,
} from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
  ERROR_CREATE_DATA,
  ERROR_DATA_NOT_FOUND,
  ERROR_FETCH,
} from "@/lib/constants";
import { and, eq, isNull } from "drizzle-orm";
import { z } from "zod";

type USER_TYPE = "INDIVIDU" | "KORPORAT";

export const promosRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(promos)
      .where(isNull(promos.deletedTime));

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data };
  }),

  detail: publicProcedure
    .input(z.object({ promoId: z.number() }))
    .query(async ({ ctx, input }) => {
      const [data] = await ctx.db
        .select()
        .from(promos)
        .where(eq(promos.id, Number(input.promoId)))
        .leftJoin(loanTypes, eq(promos.loanTypeId, loanTypes.id));

      if (!data)
        throw new TRPCError({
          message: ERROR_DATA_NOT_FOUND,
          code: "NOT_FOUND",
        });

      return { data };
    }),

  main: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(promos)
      .where(and(eq(promos.mainPromo, true), isNull(promos.deletedTime)));

    if (!data)
      throw new TRPCError({ message: ERROR_DATA_NOT_FOUND, code: "NOT_FOUND" });

    return { data };
  }),

  subscription: publicProcedure
    .input(
      z.object({
        userType: z.string(),
        name: z.string(),
        phone: z.string(),
        company: z.string().optional(),
        promoId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, company, phone, promoId, userType } = input;

      const data = await ctx.db.insert(promoSubscription).values({
        userType: userType as USER_TYPE,
        name,
        phoneNumber: phone,
        companyName: company || "",
        isSubscribe: true,
        promoId,
      });

      if (!data)
        throw new TRPCError({
          message: ERROR_CREATE_DATA,
          code: "BAD_REQUEST",
        });

      return { data };
    }),
});
