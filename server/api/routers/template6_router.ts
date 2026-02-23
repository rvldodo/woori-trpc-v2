import { template6 } from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";
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
import { z } from "zod";

const KEBIJAKAN_MANAJEMEN_RESIKO = 20;
const KODE_ETIK = 19;
const PEDOMAN_KERJA = 16;
const PIAGAM_UNIT_AUDIT_INTERNAL = 17;
const KOMITE_AUDIT = 18;

export const template6Router = createTRPCRouter({
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

  template6DataByTabsId: publicProcedure
    .input(
      z.object({ category: z.string().optional(), key: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [
        isNull(template6.deletedTime),
        eq(template6.subNavbarTabId, KEBIJAKAN_MANAJEMEN_RESIKO),
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

  kodeEtik: publicProcedure
    .input(
      z.object({ category: z.string().optional(), key: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [
        isNull(template6.deletedTime),
        eq(template6.subNavbarTabId, KODE_ETIK),
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

  pedomanKerja: publicProcedure
    .input(
      z.object({ category: z.string().optional(), key: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [
        isNull(template6.deletedTime),
        eq(template6.subNavbarTabId, PEDOMAN_KERJA),
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

  piagamUnitAudit: publicProcedure
    .input(
      z.object({ category: z.string().optional(), key: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [
        isNull(template6.deletedTime),
        eq(template6.subNavbarTabId, PIAGAM_UNIT_AUDIT_INTERNAL),
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
  komiteAudit: publicProcedure
    .input(
      z.object({ category: z.string().optional(), key: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      const conditions: (SQLWrapper | undefined)[] = [
        isNull(template6.deletedTime),
        eq(template6.subNavbarTabId, KOMITE_AUDIT),
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

  template6DataByTitle: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ ctx, input }) => {
      const [data] = await ctx.db
        .select()
        .from(template6)
        .where(
          sql`${template6.title}::text ILIKE '%' || ${input.title} || '%'`,
        );

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),
});
