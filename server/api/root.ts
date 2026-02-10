import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { main } from "@/server/api/routers";

export const appRouter = createTRPCRouter({ main });
export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
