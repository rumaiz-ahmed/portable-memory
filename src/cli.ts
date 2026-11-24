import { ask } from "./ask.js";

const prompt = process.argv.slice(2).join(" ").trim();

if (!prompt) {
  console.error('Usage: npx tsx --env-file=.env src/cli.ts "your question"');
  process.exit(1);
}

try {
  console.log(await ask({ prompt }));
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
