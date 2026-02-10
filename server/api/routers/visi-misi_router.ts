import { visiMisi } from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ERROR_DATA_NOT_FOUND } from "@/lib/constants";

export const visiMisiRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.select().from(visiMisi);

    if (!data)
      throw new TRPCError({ message: ERROR_DATA_NOT_FOUND, code: "NOT_FOUND" });

    return { data };
  }),
});
