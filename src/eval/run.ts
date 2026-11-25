import { readFile } from "node:fs/promises";
import { ask } from "../ask.js";
import { loadMemory } from "../memory.js";
import { buildPrompt } from "../prompt.js";
import { score } from "./score.js";

export type Question = { id: string; question: string; expected: string[] };
export type Failure = { id: string; said: string };
export type EvalResult = { passed: number; total: number; failures: Failure[] };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function askWithRetry(prompt: string, model: string): Promise<string> {
  try {
    return await ask({ prompt, model });
  } catch {
    await sleep(20_000); // one retry, mostly for rate limits
    return ask({ prompt, model });
  }
}

// Questions run one at a time on purpose: cheaper and gentler on rate limits.
export async function runEval(model: string, delayMs = 1500): Promise<EvalResult> {
  const file = new URL("./questions.json", import.meta.url);
  const questions = JSON.parse(await readFile(file, "utf8")) as Question[];
  const notes = await loadMemory("memory");
  const failures: Failure[] = [];
  let passed = 0;

  for (const q of questions) {
    let said: string;
    try {
      said = await askWithRetry(buildPrompt(notes, q.question), model);
    } catch (err) {
      said = `[error] ${err instanceof Error ? err.message : String(err)}`;
    }
    if (score(said, q.expected)) passed++;
    else failures.push({ id: q.id, said });
    await sleep(delayMs);
  }
  return { passed, total: questions.length, failures };
}
