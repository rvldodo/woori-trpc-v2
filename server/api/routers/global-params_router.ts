import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { globalParams } from "@/drizzle/migrations/schema";
import { eq, ilike, like } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";

export const globalParamsRouter = createTRPCRouter({
  getByKey: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ ctx, input }) => {
      const { key } = input;
      console.log(key);

      const [data] = await ctx.db
        .select()
        .from(globalParams)
        .where(ilike(globalParams.key, key));

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),
});
