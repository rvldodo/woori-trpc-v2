import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { and, eq, ilike, isNull, or, sql, SQLWrapper } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { ERROR_DATA_NOT_FOUND, ERROR_FETCH } from "@/lib/constants";
import { faqs } from "@/drizzle/migrations/schema";

export const faqRouter = createTRPCRouter({
  type: publicProcedure
    .input(z.coerce.string())
    .query(async ({ ctx, input }) => {
      if (input === "")
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      const type = input;

      const iLikeQuery = type.split(" ").map((w) => ilike(faqs.type, `%${w}%`));

      const data = await ctx.db
        .select()
        .from(faqs)
        .where(and(...iLikeQuery));

      if (!data)
        throw new TRPCError({
          message: ERROR_DATA_NOT_FOUND,
          code: "NOT_FOUND",
        });

      return { data };
    }),

  list: publicProcedure
    .input(
      z.object({ category: z.string().optional(), key: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [];

      if (input.key) {
        conditions.push(
          or(
            sql`LOWER(${faqs.question}->>'en') LIKE LOWER('%' || ${input.key} || '%')`,
            sql`LOWER(${faqs.question}->>'id') LIKE LOWER('%' || ${input.key} || '%')`,
          ),
        );
      }

      if (input.category) {
        conditions.push(
          or(
            sql`LOWER(${faqs.type}->>'en') LIKE LOWER('%' || ${input.category} || '%')`,
            sql`LOWER(${faqs.type}->>'id') LIKE LOWER('%' || ${input.category} || '%')`,
          ),
        );
      }

      const data = await ctx.db
        .select()
        .from(faqs)
        .where(and(...conditions));

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),

  category: publicProcedure.query(async ({ ctx }) => {
    const allCategories = await ctx.db
      .select({ category: faqs.type })
      .from(faqs)
      .where(isNull(faqs.deletedTime)); // Exclude deleted FAQs

    if (!allCategories || allCategories.length === 0)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    // Remove duplicates based on JSON content
    const seen = new Map<string, any>();
    const uniqueCategories = allCategories.filter((item) => {
      if (!item.category) return false; // Skip null/undefined
      const key = JSON.stringify(item.category);
      if (seen.has(key)) return false;
      seen.set(key, item.category);
      return true;
    });

    if (uniqueCategories.length === 0)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data: uniqueCategories };
  }),

  main: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.select().from(faqs).where(eq(faqs.isMain, true));

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data };
  }),
});
