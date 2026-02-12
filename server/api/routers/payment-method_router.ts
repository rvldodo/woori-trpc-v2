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
            sql`LOWER(${paymentMethods.type}->>'en') LIKE LOWER('%' || ${key} || '%')`,
            sql`LOWER(${paymentMethods.type}->>'id') LIKE LOWER('%' || ${key} || '%')`,
          ),
        );
      }

      const data = await ctx.db
        .select({
          paymentMethod: paymentMethods, // Select all payment method fields
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

      if (data.length === 0) {
        return { data: {} }; // Return empty object if no payment methods found
      }

      const groupedData = data.reduce<
        Record<string, (typeof paymentMethods.$inferSelect)[]>
      >((acc, item) => {
        // Ensure category exists with a fallback
        const category = item.paymentMethod.category ?? "BANK TRANSFER";

        // Initialize array if category doesn't exist
        if (!acc[category]) {
          acc[category] = [];
        }

        // Safely push payment method
        acc[category]?.push(item.paymentMethod);
        return acc;
      }, {});

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
