import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export type Note = { name: string; text: string };

export async function loadMemory(dir: string): Promise<Note[]> {
  let files: string[];
  try {
    files = await readdir(dir);
  } catch {
    throw new Error(`Memory folder not found: ${dir}`);
  }

  const mdFiles = files.filter((f) => f.endsWith(".md")).sort();

  return Promise.all(
    mdFiles.map(async (name) => ({
      name,
      text: (await readFile(join(dir, name), "utf8")).trim(),
    })),
  );
}
