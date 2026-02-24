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
import { and, asc, desc, eq, isNull, sql, SQLWrapper } from "drizzle-orm";
import { z } from "zod";
import { schema } from "../schema";

type USER_TYPE = "INDIVIDU" | "KORPORAT";

export const promosRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({ promo_order: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [
        isNull(promos.deletedTime),
      ];

      const data = await ctx.db
        .select()
        .from(promos)
        .where(and(...conditions))
        .orderBy(
          input.promo_order ? asc(promos.deadline) : desc(promos.deadline),
        );

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),

  detail: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const [data] = await ctx.db
        .select()
        .from(promos)
        .where(sql`${promos.title}::text ILIKE '%' || ${input.slug} || '%'`)
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
    .input(schema.promo.subscription)
    .mutation(async ({ ctx, input }) => {
      const { name, company, phone, promo_id, user_type } = input;

      const data = await ctx.db.insert(promoSubscription).values({
        userType: user_type as USER_TYPE,
        name,
        phoneNumber: phone,
        companyName: company || "",
        isSubscribe: true,
        promoId: promo_id,
      });

      if (!data)
        throw new TRPCError({
          message: ERROR_CREATE_DATA,
          code: "BAD_REQUEST",
        });

      return { data };
    }),
});
