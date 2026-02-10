import {
  profilCompany,
  profilCompanyContents,
} from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { ERROR_DATA_NOT_FOUND } from "@/lib/constants";
import { eq } from "drizzle-orm";

export const profileCompanyRouter = createTRPCRouter({
  profileCompany: publicProcedure.query(async ({ ctx }) => {
    const [data] = await ctx.db
      .select()
      .from(profilCompany)
      .where(eq(profilCompany.isActive, true));

    if (!data)
      throw new TRPCError({ message: ERROR_DATA_NOT_FOUND, code: "NOT_FOUND" });

    return { data };
  }),

  profilCompanyContent: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.select().from(profilCompanyContents);

    if (!data)
      throw new TRPCError({ message: ERROR_DATA_NOT_FOUND, code: "NOT_FOUND" });

    return { data };
  }),
});
