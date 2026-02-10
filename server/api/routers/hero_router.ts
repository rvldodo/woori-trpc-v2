import { heros, heroTabs } from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ERROR_DATA_NOT_FOUND, ERROR_FETCH } from "@/lib/constants";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const heroRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const [data] = await ctx.db.select().from(heros);

    if (!data)
      throw new TRPCError({ message: ERROR_DATA_NOT_FOUND, code: "NOT_FOUND" });

    return { data };
  }),

  heroTabsByTabId: publicProcedure
    .input(z.object({ subnavbarId: z.number() }))
    .query(async ({ ctx, input }) => {
      const { subnavbarId } = input;

      const [data] = await ctx.db
        .select()
        .from(heroTabs)
        .where(eq(heroTabs.subNavbarId, subnavbarId));

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),
});
