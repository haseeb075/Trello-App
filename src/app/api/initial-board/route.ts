import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data/board.json");
  if (existsSync(filePath)) {
    const data = readFileSync(filePath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  }
  const fallback = [
    {
      id: "todo",
      title: "To Do",
      cards: [{ id: "card1", content: "First task" }],
    },
    {
      id: "in-progress",
      title: "In Progress",
      cards: [],
    },
    {
      id: "done",
      title: "Done",
      cards: [],
    },
  ];

  return NextResponse.json(fallback);
}
