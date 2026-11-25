import { ask } from "./ask.js";
import { loadMemory } from "./memory.js";
import { buildPrompt } from "./prompt.js";

const args = process.argv.slice(2);
const useMemory = !args.includes("--no-memory");
const question = args.filter((a) => a !== "--no-memory").join(" ");

if (!question) {
  console.error('Usage: npx tsx --env-file=.env src/cli.ts [--no-memory] "your question"');
  process.exit(1);
}

try {
  const notes = useMemory ? await loadMemory("memory") : [];
  console.log(await ask({ prompt: buildPrompt(notes, question) }));
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
