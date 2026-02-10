import { db } from "@/drizzle/migrations/db";
import { transformer } from "@/trpc/shared";
import { initTRPC, TRPCError } from "@trpc/server";
import { ZodError } from "zod";
import { decryptAES } from "../lib/encrypt";
import { env } from "@/env.mjs";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return { db, ...opts };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: transformer,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure.use(({ ctx, next }) => {
  const key = ctx.headers.get("X-API-KEY");

  if (!key) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "API key is required",
    });
  }

  const [encrypt, iv, tag] = key.split(".");
  const decrypt = decryptAES({
    encrypted: encrypt as string,
    iv: iv as string,
    tag: tag as string,
  });

  if (decrypt !== env.API_PRIVATE_KEY) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "API key is invalid",
    });
  }

  return next();
});
