import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { template3 } from "@/drizzle/migrations/schema";
import { and, eq, isNull } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";

export const template3Router = createTRPCRouter({
  getDataByTabsAndSubnavbarId: publicProcedure
    .input(z.object({ tabId: z.number(), subnavbarId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { tabId, subnavbarId } = input;

      const data = await ctx.db
        .select()
        .from(template3)
        .where(
          and(
            eq(template3.subNavbarId, subnavbarId),
            eq(template3.subNavbarTabId, tabId),
            isNull(template3.deletedTime),
          ),
        );

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),
});
