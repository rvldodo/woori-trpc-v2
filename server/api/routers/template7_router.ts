import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { template7 } from "@/drizzle/migrations/schema";
import { and, desc, eq, isNull } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";

export const template7Router = createTRPCRouter({
  listBySubnavbarId: publicProcedure
    .input(z.object({ subnavbarId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { subnavbarId } = input;

      const data = await ctx.db
        .select()
        .from(template7)
        .where(
          and(
            eq(template7.subNavbarId, subnavbarId),
            isNull(template7.deletedTime),
          ),
        );

      const years = await ctx.db
        .select({ year: template7.year })
        .from(template7)
        .where(isNull(template7.deletedTime))
        .groupBy(template7.year)
        .orderBy(desc(template7.year));

      if (!data || !years)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data, years };
    }),

  detail: publicProcedure
    .input(z.object({ templateId: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const { templateId } = input;

        const [data] = await ctx.db
          .select()
          .from(template7)
          .where(eq(template7.id, templateId));

        if (!data)
          throw new TRPCError({ message: ERROR_FETCH, code: "NOT_FOUND" });

        return { data };
      } catch (error) {
        console.error(error);
        return error;
      }
    }),
});
