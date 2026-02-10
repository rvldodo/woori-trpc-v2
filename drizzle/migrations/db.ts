import { env } from "@/env.mjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
const queryClient = postgres(env.DATABASE_URL);
const db = drizzle({ client: queryClient });

export { db };
