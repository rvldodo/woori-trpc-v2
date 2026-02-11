import { publikasiPenangananDarurat } from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";
import { asc, count } from "drizzle-orm";
import z from "zod";
import { schema } from "../schema";

export const publikasiRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        ...schema.shared.pagination.shape,
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, page } = input;
      const offset = (page - 1) * limit; // Fixed pagination calculation

      const data = await ctx.db
        .select()
        .from(publikasiPenangananDarurat)
        .orderBy(asc(publikasiPenangananDarurat.id))
        .offset(offset)
        .limit(limit);

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      const total_items = await ctx.db
        .select({ count: count() })
        .from(publikasiPenangananDarurat);

      return {
        data,
        pagination: {
          page,
          limit,
          total_items: total_items.length,
          total_pages: Math.round(total_items.length / limit),
        },
      };
    }),
});
