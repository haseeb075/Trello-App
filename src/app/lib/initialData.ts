import { existsSync, readFileSync } from "fs";
import path from "path";

export async function getInitialBoard() {
  const filePath = path.resolve(process.cwd(), "src/data/board.json");
  if (existsSync(filePath)) {
    return JSON.parse(readFileSync(filePath, "utf-8"));
  }
  return [
    {
      id: "todo",
      title: "To Do",
      cards: [{ id: "card1", content: "First task" }],
    },
    { id: "doing", title: "Doing", cards: [] },
    { id: "done", title: "Done", cards: [] },
  ];
}
