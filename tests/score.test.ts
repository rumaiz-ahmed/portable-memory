import test from "node:test";
import assert from "node:assert";
import { score } from "../src/eval/score.js";

test("ignores case, punctuation and curly apostrophes", () => {
  assert.ok(score("I don’t know.", ["don't know"]));
  assert.ok(score("The mascot is **Pip**!", ["Pip"]));
  assert.ok(score("Main color: #1f5d4a", ["#1F5D4A"]));
});

test("every expected word must appear", () => {
  assert.ok(!score("SQLite", ["SQLite", "Turso"]));
  assert.ok(score("SQLite on Turso", ["SQLite", "Turso"]));
});
