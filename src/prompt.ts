import type { Note } from "./memory.js";

export function buildPrompt(notes: Note[], question: string): string {
  if (notes.length === 0) return question;

  const block = notes.map((n) => `## ${n.name}\n${n.text}`).join("\n\n");

  return [
    "Answer the question using only the notes below.",
    'If the answer is not in the notes, say "I don\'t know."',
    "",
    "NOTES:",
    block,
    "",
    `QUESTION: ${question}`,
  ].join("\n");
}
