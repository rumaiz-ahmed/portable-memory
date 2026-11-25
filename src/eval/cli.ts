import { runEval } from "./run.js";

const model = process.argv[2];
if (!model) {
  console.error("Usage: npx tsx --env-file=.env src/eval/cli.ts <model>");
  process.exit(1);
}

const { passed, total, failures } = await runEval(model);
console.log(`model: ${model}`);
console.log(`score: ${passed}/${total}`);
for (const f of failures) console.log(`FAILED ${f.id}: said ${JSON.stringify(f.said.slice(0, 200))}`);
