import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  paymentMethods,
  productPaymentMethods,
} from "@/drizzle/migrations/schema";
import { and, eq, or, sql, SQLWrapper } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";

export const paymentMethodRouter = createTRPCRouter({
  listByProductId: publicProcedure
    .input(
      z.object({ productId: z.coerce.number(), key: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const { productId, key } = input;
      const conditions: (SQLWrapper | undefined)[] = [
        eq(productPaymentMethods.productId, productId),
        eq(paymentMethods.isActive, true),
      ];

      if (key) {
        conditions.push(
          or(
            sql`LOWER(${paymentMethods.type}->>'en') ILIKE LOWER('%' || ${key} || '%')`,
            sql`LOWER(${paymentMethods.type}->>'id') ILIKE LOWER('%' || ${key} || '%')`,
          ),
        );
      }

      const data = await ctx.db
        .select({
          category: paymentMethods.category,
          description: paymentMethods.description,
          id: paymentMethods.id,
          isActive: paymentMethods.isActive,
          type: paymentMethods.type,
          createdTime: paymentMethods.createdTime,
          updatedTime: paymentMethods.updatedTime,
          deletedTime: paymentMethods.deletedTime,
        })
        .from(productPaymentMethods)
        .innerJoin(
          paymentMethods,
          eq(productPaymentMethods.paymentId, paymentMethods.id),
        )
        .where(and(...conditions));

      if (!data) {
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });
      }

      return { data: data };
    }),

  typeByProductID: publicProcedure
    .input(z.object({ productId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { productId } = input;

      const data = await ctx.db
        .selectDistinctOn([paymentMethods.category], {
          id: paymentMethods.id,
          category: paymentMethods.category,
          type: paymentMethods.type,
          description: paymentMethods.description,
        })
        .from(productPaymentMethods)
        .innerJoin(
          paymentMethods,
          eq(productPaymentMethods.paymentId, paymentMethods.id),
        )
        .where(
          and(
            eq(productPaymentMethods.productId, productId),
            eq(paymentMethods.isActive, true),
          ),
        )
        .orderBy(paymentMethods.category);

      if (!data || data.length === 0) {
        return { data: [] };
      }

      return { data };
    }),
});
