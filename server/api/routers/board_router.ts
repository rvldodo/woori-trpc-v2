import { boards, template2 } from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";
import { and, eq, isNull } from "drizzle-orm";

export const boardsRouter = createTRPCRouter({
  types: publicProcedure.query(async ({ ctx }) => {
    const types = await ctx.db
      .select({ type: boards.boardType })
      .from(boards)
      .where(and(isNull(boards.deletedTime)))
      .groupBy(boards.boardType);
    if (!types)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data: types };
  }),

  wording: publicProcedure.query(async ({ ctx }) => {
    const [wording] = await ctx.db
      .select()
      .from(template2)
      .where(
        and(eq(template2.subNavbarId, 6), eq(template2.subNavbarTabId, 6)),
      );
    if (!wording)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { wording };
  }),
  direksi: publicProcedure.query(async ({ ctx }) => {
    const direksi = await ctx.db
      .select()
      .from(boards)
      .where(and(eq(boards.boardType, "DIREKSI"), isNull(boards.deletedTime)));
    if (!direksi)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data: direksi };
  }),
  komisaris: publicProcedure.query(async ({ ctx }) => {
    const direksi = await ctx.db
      .select()
      .from(boards)
      .where(
        and(eq(boards.boardType, "KOMISARIS"), isNull(boards.deletedTime)),
      );
    if (!direksi)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data: direksi };
  }),
});
