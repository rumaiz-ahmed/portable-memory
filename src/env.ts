import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

// Everything is optional here so callers can pass their own values to ask().
// ask() checks that a base URL and model exist before sending anything.
export const env = createEnv({
  server: {
    LLM_BASE_URL: z.url().optional(),
    LLM_API_KEY: z.string().default("not-needed"), // local servers need no key
    LLM_MODEL: z.string().optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
