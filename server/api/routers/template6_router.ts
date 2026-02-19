import { template6 } from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

export const template6Router = createTRPCRouter({
  template6DataByTabsId: publicProcedure
    .input(z.object({ tabId: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      const { tabId } = input;

      const categories = await ctx.db
        .select({
          category: template6.category,
        })
        .from(template6)
        .where(eq(template6.subNavbarTabId, tabId));

      if (!categories)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      const data = await ctx.db
        .select()
        .from(template6)
        .where(eq(template6.subNavbarTabId, tabId))
        .orderBy(desc(template6.createdTime));

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data, categories };
    }),

  template6DataById: publicProcedure
    .input(z.object({ dataId: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      const { dataId } = input;

      const [data] = await ctx.db
        .select()
        .from(template6)
        .where(eq(template6.id, dataId));

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),
});
