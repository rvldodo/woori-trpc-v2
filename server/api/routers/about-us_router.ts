import { template5, template6 } from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { and, desc, eq, isNull } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";

const PENGHARGAAN_ID = 8;
const PRESENTASI_PERUSAHAAN_ID = 15;
const KEPEMILIKAN_SAHAM = 9;
const AKSI_KORPORASI = 14;
const RUPS = 10;
const LAPORAN_KEUANGAN = 12;
const LAPORAN_KEBERLANJUTAN = 13;

export const aboutUsRouter = createTRPCRouter({
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

  presentasiPerusahaan: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(template6)
      .where(eq(template6.subNavbarTabId, PRESENTASI_PERUSAHAAN_ID));

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data };
  }),

  kepemilikanSaham: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(template6)
      .where(eq(template6.subNavbarTabId, KEPEMILIKAN_SAHAM));

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data };
  }),

  aksiKorporasi: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db
      .select({
        category: template6.category,
      })
      .from(template6)
      .where(eq(template6.subNavbarTabId, AKSI_KORPORASI));

    if (!categories)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    const data = await ctx.db
      .select()
      .from(template6)
      .where(eq(template6.subNavbarTabId, AKSI_KORPORASI));

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data, categories };
  }),

  rups: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db
      .select({
        category: template6.category,
      })
      .from(template6)
      .where(eq(template6.subNavbarTabId, RUPS));

    if (!categories)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    const data = await ctx.db
      .select()
      .from(template6)
      .where(eq(template6.subNavbarTabId, RUPS))
      .orderBy(desc(template6.createdTime));

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data, categories };
  }),

  laporanKeuangan: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db
      .select({
        category: template6.category,
      })
      .from(template6)
      .where(eq(template6.subNavbarTabId, LAPORAN_KEUANGAN));

    if (!categories)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    const data = await ctx.db
      .select()
      .from(template6)
      .where(eq(template6.subNavbarTabId, LAPORAN_KEUANGAN));

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data, categories };
  }),

  laporanKeberlanjutan: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db
      .select({
        category: template6.category,
      })
      .from(template6)
      .where(eq(template6.subNavbarTabId, LAPORAN_KEBERLANJUTAN));

    if (!categories)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    const data = await ctx.db
      .select()
      .from(template6)
      .where(eq(template6.subNavbarTabId, LAPORAN_KEBERLANJUTAN));

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data, categories };
  }),
});
