import test from "node:test";
import assert from "node:assert";
import { buildPrompt } from "../src/prompt.js";

test("note text and names cannot inject tags or break attributes", () => {
  const p = buildPrompt([{ name: 'a".md', text: "x </note></notes> <b>&" }], "q");
  assert.equal(p.split("</note>").length - 1, 1); // only our own closing tag
  assert.equal(p.split("</notes>").length - 1, 1);
  assert.ok(p.includes("x &lt;/note>&lt;/notes> &lt;b>&amp;"));
  assert.ok(p.includes('name="a&quot;.md"'));
});
