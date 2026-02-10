import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { and, eq, ilike, or, sql, SQLWrapper } from "drizzle-orm";
import { branches, coordinates } from "@/drizzle/migrations/schema";

export const branchesRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        key: z.string().optional(),
        area: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { key, area } = input;
      const conditions: (SQLWrapper | undefined)[] = [];

      if (key) {
        conditions.push(
          or(
            sql`LOWER(${branches.name}->>'en') LIKE LOWER('%' || ${key} || '%')`,
            sql`LOWER(${branches.name}->>'id') LIKE LOWER('%' || ${key} || '%')`,
            sql`LOWER(${branches.name}::text) LIKE LOWER('%' || ${key} || '%')`,
          ),
        );
      }

      if (area) {
        // Parse area to integer if it's stored as integer array
        const areaId = parseInt(area);
        if (!isNaN(areaId)) {
          conditions.push(
            sql`${branches.coordinateId} @> ARRAY[${areaId}]::integer[]`,
          );
        }
      }

      const data = await ctx.db
        .select()
        .from(branches)
        .where(and(...conditions));

      if (!data) {
        throw new TRPCError({
          message: "Failed to fetch branch data",
          code: "BAD_REQUEST",
        });
      }

      return { data };
    }),

  category: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select({ category: branches.category })
      .from(branches)
      .groupBy(branches.category);

    if (!data)
      throw new TRPCError({
        message: "Failed to fetch branch categories",
        code: "BAD_REQUEST",
      });

    return { data };
  }),
  provinces: publicProcedure
    .input(z.object({ filterKey: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { filterKey } = input;
      const conditions: (SQLWrapper | undefined)[] = [];

      if (filterKey) {
        conditions.push(ilike(coordinates.title, filterKey));
      }

      const data = await ctx.db
        .select({ provinces: coordinates.title, id: coordinates.id })
        .from(coordinates)
        .where(and(...conditions));

      if (!data)
        throw new TRPCError({
          message: "Failed to fetch branch categories",
          code: "BAD_REQUEST",
        });

      return { data };
    }),
  type: publicProcedure
    .input(z.enum(["HE", "ALL"]))
    .query(async ({ ctx, input }) => {
      const type = input;
      const data = await ctx.db
        .select()
        .from(branches)
        .where(eq(branches.type, type));

      if (!data)
        throw new TRPCError({
          message: "Failed to fetch branch data",
          code: "BAD_REQUEST",
        });

      return { data };
    }),
});
