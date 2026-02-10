import { complaints } from "@/drizzle/migrations/schema";
import { schema } from "../schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const complaintsRouter = createTRPCRouter({
  send: publicProcedure
    .input(schema.complaint.complaint_form)
    .mutation(async ({ ctx, input }) => {
      const { name, email, type, message } = input;

      console.log(type);

      const [data] = await ctx.db
        .insert(complaints)
        .values({
          name,
          email,
          complaintType: Number(type),
          message,
        })
        .returning();
      if (!data)
        throw new TRPCError({
          message: "Failed to insert data",
          code: "BAD_REQUEST",
        });

      return { data };
    }),
});
