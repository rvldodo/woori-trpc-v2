import { template5, template6 } from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  and,
  desc,
  eq,
  isNotNull,
  isNull,
  or,
  sql,
  SQLWrapper,
} from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";
import z from "zod";

export const PENGHARGAAN_ID = 8;
export const PRESENTASI_PERUSAHAAN_ID = 15;
export const KEPEMILIKAN_SAHAM = 9;
export const AKSI_KORPORASI = 14;
export const RUPS = 10;
export const LAPORAN_KEUANGAN = 12;
export const LAPORAN_KEBERLANJUTAN = 13;

export const aboutUsRouter = createTRPCRouter({
  template6Category: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const categories = await ctx.db
        .select()
        .from(template6)
        .where(
          and(
            eq(template6.subNavbarTabId, input.id),
            isNotNull(template6.subNavbarTabId),
          ),
        )
        .orderBy(template6.id);

      if (!categories.length)
        throw new TRPCError({ message: ERROR_FETCH, code: "NOT_FOUND" });

      const unique = [
        ...new Map(
          categories
            .filter((e) => e.category !== null)
            .map((e) => [JSON.stringify(e.category), e.category]),
        ).values(),
      ];

      return { data: unique };
    }),

  penghargaan: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(template5)
      .where(
        and(
          eq(template5.subNavbarTabsId, PENGHARGAAN_ID),
          isNull(template5.deletedTime),
        ),
      );

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data };
  }),

  presentasiPerusahaan: publicProcedure
    .input(
      z.object({ category: z.string().optional(), key: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [
        isNull(template6.deletedTime),
        eq(template6.subNavbarTabId, PRESENTASI_PERUSAHAAN_ID),
      ];

      if (input.category) {
        conditions.push(
          or(
            sql`LOWER(${template6.category}->>'en') LIKE LOWER('%' || ${input.category} || '%')`,
            sql`LOWER(${template6.category}->>'id') LIKE LOWER('%' || ${input.category} || '%')`,
          ),
        );
      }

      if (input.key) {
        conditions.push(
          sql`${template6.title}::text ILIKE '%' || ${input.key} || '%'`,
        );
      }

      const data = await ctx.db
        .select()
        .from(template6)
        .where(and(...conditions))
        .orderBy(desc(template6.createdTime));

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),

  kepemilikanSaham: publicProcedure
    .input(z.object({ category: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [
        isNull(template6.deletedTime),
        eq(template6.subNavbarTabId, KEPEMILIKAN_SAHAM),
      ];

      if (input.category) {
        conditions.push(
          or(
            sql`LOWER(${template6.category}->>'en') LIKE LOWER('%' || ${input.category} || '%')`,
            sql`LOWER(${template6.category}->>'id') LIKE LOWER('%' || ${input.category} || '%')`,
          ),
        );
      }

      const data = await ctx.db
        .select()
        .from(template6)
        .where(and(...conditions))
        .orderBy(desc(template6.createdTime));

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),

  aksiKorporasi: publicProcedure
    .input(
      z.object({ category: z.string().optional(), key: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [
        isNull(template6.deletedTime),
        eq(template6.subNavbarTabId, AKSI_KORPORASI),
      ];

      if (input.category) {
        conditions.push(
          or(
            sql`LOWER(${template6.category}->>'en') LIKE LOWER('%' || ${input.category} || '%')`,
            sql`LOWER(${template6.category}->>'id') LIKE LOWER('%' || ${input.category} || '%')`,
          ),
        );
      }

      if (input.key) {
        conditions.push(
          sql`${template6.title}::text ILIKE '%' || ${input.key} || '%'`,
        );
      }

      const data = await ctx.db
        .select()
        .from(template6)
        .where(and(...conditions))
        .orderBy(desc(template6.createdTime));

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),

  rups: publicProcedure
    .input(
      z.object({ category: z.string().optional(), key: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [
        isNull(template6.deletedTime),
        eq(template6.subNavbarTabId, RUPS),
      ];

      if (input.category) {
        conditions.push(
          or(
            sql`LOWER(${template6.category}->>'en') LIKE LOWER('%' || ${input.category} || '%')`,
            sql`LOWER(${template6.category}->>'id') LIKE LOWER('%' || ${input.category} || '%')`,
          ),
        );
      }

      if (input.key) {
        conditions.push(
          sql`${template6.title}::text ILIKE '%' || ${input.key} || '%'`,
        );
      }

      const data = await ctx.db
        .select()
        .from(template6)
        .where(and(...conditions))
        .orderBy(desc(template6.createdTime));

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),

  laporanKeuangan: publicProcedure
    .input(
      z.object({ category: z.string().optional(), key: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [
        isNull(template6.deletedTime),
        eq(template6.subNavbarTabId, LAPORAN_KEUANGAN),
      ];

      if (input.category) {
        conditions.push(
          or(
            sql`LOWER(${template6.category}->>'en') LIKE LOWER('%' || ${input.category} || '%')`,
            sql`LOWER(${template6.category}->>'id') LIKE LOWER('%' || ${input.category} || '%')`,
          ),
        );
      }

      if (input.key) {
        conditions.push(
          sql`${template6.title}::text ILIKE '%' || ${input.key} || '%'`,
        );
      }

      const data = await ctx.db
        .select()
        .from(template6)
        .where(and(...conditions))
        .orderBy(desc(template6.createdTime));

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),

  laporanKeberlanjutan: publicProcedure
    .input(
      z.object({ category: z.string().optional(), key: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [
        isNull(template6.deletedTime),
        eq(template6.subNavbarTabId, LAPORAN_KEBERLANJUTAN),
      ];

      if (input.category) {
        conditions.push(
          or(
            sql`LOWER(${template6.category}->>'en') LIKE LOWER('%' || ${input.category} || '%')`,
            sql`LOWER(${template6.category}->>'id') LIKE LOWER('%' || ${input.category} || '%')`,
          ),
        );
      }

      if (input.key) {
        conditions.push(
          sql`${template6.title}::text ILIKE '%' || ${input.key} || '%'`,
        );
      }

      const data = await ctx.db
        .select()
        .from(template6)
        .where(and(...conditions))
        .orderBy(desc(template6.createdTime));

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),
});
