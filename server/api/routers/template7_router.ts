import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { template7 } from "@/drizzle/migrations/schema";
import { and, desc, eq, isNull, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";

export const template7Router = createTRPCRouter({
  listBySubnavbarId: publicProcedure
    .input(z.object({ subnavbarId: z.number(), year: z.string() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db
        .select()
        .from(template7)
        .where(
          and(
            eq(template7.subNavbarId, input.subnavbarId),
            isNull(template7.deletedTime),
            eq(template7.year, Number(input.year)),
          ),
        );

      return { data };
    }),

  detail: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ ctx, input }) => {
      const [data] = await ctx.db
        .select()
        .from(template7)
        .where(
          sql`${template7.title}::text ILIKE '%' || ${input.title} || '%'`,
        );

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "NOT_FOUND" });

      return { data };
    }),
});
