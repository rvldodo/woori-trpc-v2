import { complaintTypes } from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";

export const complainTypeRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.select().from(complaintTypes);

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data };
  }),
});
