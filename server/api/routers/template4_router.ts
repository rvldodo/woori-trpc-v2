import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";
import { template4 } from "@/drizzle/migrations/schema";

export const template4Router = createTRPCRouter({
  getDataByTabsAndSubnavbarId: publicProcedure
    .input(z.object({ tabId: z.number(), subnavbarId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { tabId, subnavbarId } = input;

      const data = await ctx.db
        .select()
        .from(template4)
        .where(
          and(
            eq(template4.subNavbarId, subnavbarId),
            eq(template4.subNavbarTabId, tabId),
          ),
        );

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),
});
