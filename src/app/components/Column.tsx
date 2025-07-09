import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";
import { useBoard } from "../context/BoardContext";
import { useState } from "react";

export default function Column({ column }: { column: any }) {
  const { addCard, deleteColumn, renameColumn } = useBoard();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  const handleRename = () => {
    renameColumn(column.id, title);
    setEditing(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded w-64">
      <div className="flex justify-between items-center mb-2">
        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleRename}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            className="border p-1 rounded w-full text-sm"
            autoFocus
          />
        ) : (
          <h2
            className="text-lg font-bold cursor-pointer"
            onClick={() => setEditing(true)}
          >
            {column.title}
          </h2>
        )}
        <button
          onClick={() => deleteColumn(column.id)}
          className="text-red-500"
        >
          ✕
        </button>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[20px]"
          >
            {column.cards.map((card: any, index: number) => (
              <Card key={card.id} card={card} index={index} colId={column.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        onClick={() => addCard(column.id)}
        className="text-sm text-blue-600 mt-2"
      >
        + Add Card
      </button>
    </div>
  );
}
