import { procurements } from "@/drizzle/migrations/schema";
import { schema } from "../schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ERROR_DATA_NOT_FOUND, ERROR_FETCH } from "@/lib/constants";
import { z } from "zod";
import { and, count, eq, or, sql, type SQLWrapper } from "drizzle-orm";

export const procurementRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        ...schema.shared.pagination.shape,
        key: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, page, key } = input;
      const offset = (page - 1) * limit; // Fixed pagination calculation

      const conditions: (SQLWrapper | undefined)[] = []; // More specific type than 'any'

      if (key) {
        if (key) {
          conditions.push(
            or(
              sql`LOWER(${procurements.title}->>'en') LIKE LOWER('%' || ${key} || '%')`,
              sql`LOWER(${procurements.title}->>'id') LIKE LOWER('%' || ${key} || '%')`,
              sql`LOWER(${procurements.title}::text) LIKE LOWER('%' || ${key} || '%')`,
            ),
          );
        }
      }

      const data = await ctx.db
        .select()
        .from(procurements)
        .where(conditions.length ? and(...conditions) : undefined)
        .offset(offset)
        .limit(limit);

      if (!data) {
        throw new TRPCError({
          message: ERROR_FETCH,
          code: "BAD_REQUEST",
          cause: "Failed to fetch procurement data",
        });
      }

      const total_items = await ctx.db
        .select({ count: count() })
        .from(procurements);

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

  detail: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const [data] = await ctx.db
        .select()
        .from(procurements)
        .where(
          sql`${procurements.title}::text ILIKE '%' || ${input.slug} || '%'`,
        );

      if (!data?.id)
        throw new TRPCError({
          message: ERROR_DATA_NOT_FOUND,
          code: "NOT_FOUND",
        });

      return { data };
    }),
});
