import { loanTypes, usp, uspCards } from "@/drizzle/migrations/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { eq, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { ERROR_BAD_REQUEST } from "@/lib/constants";
import { RouterOutputs } from "@/trpc/shared";

export const uspRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    // First, get all USPs with their loan types
    const uspData = await ctx.db
      .select({
        id: usp.id,
        type: loanTypes.name,
        title: usp.title,
        description: usp.description,
      })
      .from(usp)
      .leftJoin(loanTypes, eq(loanTypes.id, usp.loanTypeId));

    if (uspData.length === 0) {
      throw new TRPCError({
        message: ERROR_BAD_REQUEST,
        code: "BAD_REQUEST",
      });
    }

    // Then, get all cards for these USPs
    const uspIds = uspData.map((item) => item.id);
    const allCards =
      uspIds.length > 0
        ? await ctx.db
            .select({
              id: uspCards.id,
              prefixIcon: uspCards.prefixIcon,
              suffixIcon: uspCards.suffixIcon,
              redirectURL: uspCards.redirectUrl,
              text: uspCards.text,
              uspId: uspCards.uspId,
            })
            .from(uspCards)
            .where(inArray(uspCards.uspId, uspIds))
        : [];

    // Group cards by uspId
    const cardsMap = allCards.reduce(
      (acc: any, card) => {
        if (!acc[card.uspId]) {
          acc[card.uspId] = [];
        }
        acc[card.uspId].push({
          id: card.id,
          prefixIcon: card.prefixIcon,
          suffixIcon: card.suffixIcon,
          text: card.text,
          redirectURL: card.redirectURL,
        });
        return acc;
      },
      {} as Record<number, any[]>,
    );

    // Combine USP data with their cards
    const result = uspData.map((uspItem) => ({
      id: uspItem.id,
      type: uspItem.type,
      title: uspItem.title,
      description: uspItem.description,
      cards: cardsMap[uspItem.id] || [],
    }));

    return { data: result };
  }),
});

export type USPListOutput = RouterOutputs["main"]["usp"]["list"];
export type USPCards = USPListOutput["data"][number]["cards"];
export type USPDescription = USPListOutput["data"][number]["description"];
