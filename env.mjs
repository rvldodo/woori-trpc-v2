// src/env.ts or src/env.js
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Server-side Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NODE_ENV: z
      .enum(["testing", "production", "development", "test"])
      .default("testing"),
    DATABASE_URL: z.string().url(),
    MOBILE_SERVER_URL: z.string().url(),
    MAXI_LOAN_URL: z.string().url(),
    SANDEZA: z.string().url(),
    SANDEZA_USERNAME: z.string(),
    SANDEZA_PASSWORD: z.string(),
    ELASTICSEARCH_URL: z.string().url().default("http://localhost:9200"),
    ELASTICSEARCH_USERNAME: z.string().optional(),
    ELASTICSEARCH_PASSWORD: z.string().optional(),
    API_PRIVATE_KEY: z.string(),
  },
  /*
   * Environment variables available on the client (and server).
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_URL: z.string(),
    NEXT_PUBLIC_SITEKEY: z.string(),
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_STATIC_KEY: z.string(),
    NEXT_PUBLIC_ENCRYPT_SECRET: z.string(),
  },
  /*
   * If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
   * for the server variables.
   */
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    MOBILE_SERVER_URL: process.env.MOBILE_SERVER_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITEKEY: process.env.NEXT_PUBLIC_SITEKEY,
    MAXI_LOAN_URL: process.env.DB_MAXI_14_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    SANDEZA: process.env.SANDEZA,
    SANDEZA_USERNAME: process.env.SANDEZA_USERNAME,
    SANDEZA_PASSWORD: process.env.SANDEZA_PASSWORD,
    NEXT_PUBLIC_STATIC_KEY: process.env.NEXT_PUBLIC_STATIC_KEY,
    ELASTICSEARCH_URL: process.env.ELASTICSEARCH_URL,
    ELASTICSEARCH_USERNAME: process.env.ELASTICSEARCH_USERNAME,
    ELASTICSEARCH_PASSWORD: process.env.ELASTICSEARCH_PASSWORD,
    NEXT_PUBLIC_ENCRYPT_SECRET: process.env.NEXT_PUBLIC_ENCRYPT_SECRET,
    API_PRIVATE_KEY: process.env.API_PRIVATE_KEY,
  },
});
