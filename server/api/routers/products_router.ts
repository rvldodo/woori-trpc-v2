import { products } from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ERROR_DATA_NOT_FOUND } from "@/lib/constants";
import { eq } from "drizzle-orm";

export const productsRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select()
      .from(products)
      .where(eq(products.isActive, true));

    if (!data)
      throw new TRPCError({ message: ERROR_DATA_NOT_FOUND, code: "NOT_FOUND" });

    return { data };
  }),
});
