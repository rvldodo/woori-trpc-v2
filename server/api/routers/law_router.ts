import {
  kebijakanPrivasi,
  syaratDanKetentuan,
} from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ERROR_FETCH } from "@/lib/constants";

export const lawRouter = createTRPCRouter({
  kebijakanPrivasi: publicProcedure.query(async ({ ctx }) => {
    const [data] = await ctx.db.select().from(kebijakanPrivasi);

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data };
  }),

  syaratDanKetentuan: publicProcedure.query(async ({ ctx }) => {
    const [data] = await ctx.db.select().from(syaratDanKetentuan);

    if (!data)
      throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

    return { data };
  }),
});
