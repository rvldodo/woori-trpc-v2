import { env } from "@/env.mjs";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "drizzle/migrations",
  schema: "drizzle/schema.ts",
  dialect: "postgresql",
  strict: true,
  verbose: true,
  dbCredentials: { url: env.DATABASE_URL },
});
