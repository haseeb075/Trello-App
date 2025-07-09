"use client";
import { useBoard } from "../context/BoardContext";
import Column from "./Column";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

export default function Board({ initialBoard }: { initialBoard: any[] }) {
  const { board, updateBoard, addColumn } = useBoard(initialBoard as any);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    )
      return;

    const updatedBoard = [...board];
    const sourceCol = updatedBoard.find((col) => col.id === source.droppableId);
    const destCol = updatedBoard.find(
      (col) => col.id === destination.droppableId
    );
    const [movedCard] = sourceCol.cards.splice(source.index, 1);
    destCol.cards.splice(destination.index, 0, movedCard);

    updateBoard(updatedBoard);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex p-4 gap-4 overflow-x-auto">
        {board.map((column: any) => (
          <Column key={column.id} column={column} />
        ))}
        <button
          onClick={() => addColumn()}
          className="bg-blue-500 text-white rounded px-3 py-1 h-fit self-start"
        >
          + Column
        </button>
      </div>
    </DragDropContext>
  );
}
