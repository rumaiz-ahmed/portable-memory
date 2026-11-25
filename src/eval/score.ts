// Lowercase, turn curly quotes straight, drop punctuation, collapse spaces.
// So "I don’t know." and "i don't know" compare equal.
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// shortcut: substring match, so "I do not know" fails an expected "don't know"; loosen if graders prove too strict.
export function score(answer: string, expected: string[]): boolean {
  const a = normalize(answer);
  return expected.every((word) => a.includes(normalize(word)));
}
