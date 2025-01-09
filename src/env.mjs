// @ts-check

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().default("http://localhost:3000"),
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_NEWSLETTER_ENDPOINT: z.string().optional(),
    NEXT_PUBLIC_LANGUAGE: z.string().default("en-US"),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_NEWSLETTER_ENDPOINT: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT,
    NEXT_PUBLIC_LANGUAGE: process.env.NEXT_PUBLIC_LANGUAGE,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
  emptyStringAsUndefined: true,
});

export const publicUrl = env.NEXT_PUBLIC_SITE_URL;
