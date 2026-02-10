import "server-only";

import { type AppRouter, appRouter, createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { createQueryClient } from "@/trpc/shared";
import { TRPCClientError, createTRPCClient } from "@trpc/client";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { observable } from "@trpc/server/observable";
import type { TRPCErrorResponse } from "@trpc/server/rpc";
import { headers } from "next/headers";
import { cache } from "react";
import { encryptAES } from "@/server/lib/encrypt";
import { env } from "@/env.mjs";

const createContext = cache(async () => {
  const encrypt = encryptAES(env.API_PRIVATE_KEY);
  const key = `${encrypt.encrypted}.${encrypt.iv}.${encrypt.tag}`;
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");
  heads.set("X-API-KEY", key);
  return createTRPCContext({ headers: heads });
});

const { trpc: unlogged, HydrateClient } = createHydrationHelpers<AppRouter>(
  createCaller(createContext),
  cache(createQueryClient),
);

const logged = createTRPCClient<AppRouter>({
  links: [
    () =>
      ({ op }) =>
        observable((observer) => {
          createContext()
            .then(async (ctx) => {
              const caller = appRouter.createCaller(ctx);
              const pathParts = op.path.split(".");
              let procedure: any = caller;

              for (const part of pathParts) {
                procedure = procedure[part];
              }

              return await procedure(op.input);
            })
            .then((data) => {
              observer.next({ result: { data } });
              observer.complete();
            })
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause));
            });
        }),
  ],
});

export const api = { unlogged, logged };
export { HydrateClient };
