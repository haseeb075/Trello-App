import { Draggable } from "react-beautiful-dnd";
import { useBoard } from "../context/BoardContext";
import { useState } from "react";

export default function Card({
  card,
  index,
  colId,
}: {
  card: any;
  index: number;
  colId: string;
}) {
  const { deleteCard, renameCard } = useBoard();
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(card.content);

  const handleRename = () => {
    renameCard(colId, card.id, content);
    setEditing(false);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`bg-white p-2 mb-2 shadow rounded transition-opacity duration-200 flex justify-between items-center ${
            snapshot.isDragging ? "opacity-50" : "opacity-100"
          }`}
        >
          {editing ? (
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
              className="border p-1 rounded text-sm w-full"
              autoFocus
            />
          ) : (
            <span
              onClick={() => setEditing(true)}
              className="cursor-pointer w-full"
            >
              {card.content}
            </span>
          )}
          <button
            onClick={() => deleteCard(colId, card.id)}
            className="text-sm text-red-500 ml-2"
          >
            ✕
          </button>
        </div>
      )}
    </Draggable>
  );
}
