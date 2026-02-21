import {
  mainNavbar,
  subNavbar,
  subNavbarTabs,
} from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { and, asc, desc, eq, isNull } from "drizzle-orm";
import { z } from "zod";
import { ERROR_FETCH } from "@/lib/constants";

export const menusRouter = createTRPCRouter({
  mainMenu: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.select().from(mainNavbar);

    if (!data)
      throw new TRPCError({
        message: "Failed to fetch menu data",
        code: "BAD_REQUEST",
      });

    return { data };
  }),

  subMenu: publicProcedure
    .input(z.coerce.number())
    .query(async ({ input, ctx }) => {
      const mainMenuId = input;

      const data = await ctx.db
        .select()
        .from(subNavbar)
        .leftJoin(subNavbarTabs, eq(subNavbarTabs.subNavbarId, subNavbar.id))
        .where(
          and(
            eq(subNavbar.mainNavbarId, mainMenuId),
            isNull(subNavbarTabs.deletedTime),
          ),
        )
        .orderBy(asc(subNavbar.id));

      const groupedData = data.reduce((acc: Record<number, any>, row) => {
        const subNavbarId = row.sub_navbar.id;

        if (!acc[subNavbarId]) {
          acc[subNavbarId] = {
            ...row.sub_navbar,
            subNavbarTabs: [],
          };
        }

        if (row.sub_navbar_tabs && row?.sub_navbar_tabs?.isActive === true) {
          acc[subNavbarId].subNavbarTabs.push(row.sub_navbar_tabs);
        }

        return acc;
      }, {});

      if (!data)
        throw new TRPCError({
          message: "Failed to fetch menu data",
          code: "BAD_REQUEST",
        });

      return { data: groupedData };
    }),

  subTabs: publicProcedure
    .input(z.object({ subMenuId: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      const { subMenuId } = input;

      const data = await ctx.db
        .select()
        .from(subNavbarTabs)
        .where(
          and(
            eq(subNavbarTabs.subNavbarId, subMenuId),
            eq(subNavbarTabs.isActive, true),
            isNull(subNavbarTabs.deletedTime),
          ),
        )
        .orderBy(desc(subNavbarTabs.id));

      if (!data)
        throw new TRPCError({ message: ERROR_FETCH, code: "BAD_REQUEST" });

      return { data };
    }),
});
