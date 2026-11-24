import OpenAI from "openai";
import { env } from "./env.js";

export type AskOptions = {
  prompt: string;
  model?: string;
  baseURL?: string;
  apiKey?: string;
};

export async function ask(options: AskOptions): Promise<string> {
  const baseURL = options.baseURL ?? env.LLM_BASE_URL;
  const model = options.model ?? env.LLM_MODEL;
  if (!baseURL) throw new Error("Set a base URL via options.baseURL or LLM_BASE_URL.");
  if (!model) throw new Error("Set a model via options.model or LLM_MODEL.");

  // maxRetries: 0 so test runs fail fast instead of silently retrying (and costing money).
  const client = new OpenAI({
    baseURL,
    apiKey: options.apiKey ?? env.LLM_API_KEY,
    maxRetries: 0,
  });

  try {
    const completion = await client.chat.completions.create({
      model,
      messages: [{ role: "user", content: options.prompt }],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) throw new Error("The model returned no text.");
    return text;
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      throw new Error(`${err.status ?? "network"}: ${err.message}`);
    }
    throw err;
  }
}
