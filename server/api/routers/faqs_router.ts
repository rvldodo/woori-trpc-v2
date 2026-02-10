import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { and, eq, ilike } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { ERROR_DATA_NOT_FOUND, ERROR_FETCH } from "@/lib/constants";
import { faqs } from "@/drizzle/migrations/schema";

export const faqRouter = createTRPCRouter({
  type: publicProcedure
    .input(z.coerce.string())
    .query(async ({ ctx, input }) => {
      if (input === "")
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      const type = input;

      const iLikeQuery = type.split(" ").map((w) => ilike(faqs.type, `%${w}%`));

      const data = await ctx.db
        .select()
        .from(faqs)
        .where(and(...iLikeQuery));

      if (!data)
        throw new TRPCError({
          message: ERROR_DATA_NOT_FOUND,
          code: "NOT_FOUND",
        });

      return { data };
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.select({ category: faqs.type }).from(faqs);

    if (!categories)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    const data = await ctx.db.select().from(faqs);

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data, categories };
  }),

  main: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.select().from(faqs).where(eq(faqs.isMain, true));

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data };
  }),
});
