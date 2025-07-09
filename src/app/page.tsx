"use client";

import Board from "./components/Board";

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/initial-board", {
    cache: "no-store",
  });

  const board = await res.json();
  return <Board initialBoard={board} />;
}
