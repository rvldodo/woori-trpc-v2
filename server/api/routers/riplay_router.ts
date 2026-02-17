import { files } from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { and, eq, SQLWrapper } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";
import { z } from "zod";

export const riplayRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.object({ lang: z.string() }))
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [];

      if (input.lang === "id") {
        conditions.push(eq(files.meta, "RIPLAY"));
      } else {
        conditions.push(eq(files.meta, "RIPLAY EN"));
      }

      const data = await ctx.db
        .select()
        .from(files)
        .where(and(...conditions));
      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),

  listHE: publicProcedure
    .input(z.object({ lang: z.string() }))
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [];

      // if (input.lang === "id") {
      conditions.push(eq(files.meta, "RIPLAY HE"));
      // } else {
      //   conditions.push(eq(files.meta, "RIPLAY EN HE"));
      // }

      const data = await ctx.db
        .select()
        .from(files)
        .where(and(...conditions));
      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),
});
