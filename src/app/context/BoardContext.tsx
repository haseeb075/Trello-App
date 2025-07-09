"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const BoardContext = createContext<any>(null);
let socket: any;

function generateId() {
  return "id-" + Math.random().toString(36).substr(2, 9);
}

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [board, setBoard] = useState<any[]>([]);
  const [queuedBoard, setQueuedBoard] = useState<any[]>([]);

  useEffect(() => {
    socket = io("http://localhost:3000", {
      path: "/socket.io",
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => console.log("✅ Socket connected"));

    socket.on("board", (serverBoard: any) => {
      setBoard(serverBoard);
      setQueuedBoard([]);
    });

    socket.on("connect_error", (err: any) => {
      console.error("❌ Socket error:", err.message);
    });

    socket.on("disconnect", () => {
      console.warn("⚠️ Socket disconnected");
    });

    return () => socket.disconnect();
  }, []);

  const updateBoard = (updated: any[]) => {
    setQueuedBoard(board);
    setBoard(updated);
    socket.emit("update_board", updated);
  };

  const addCard = (colId: string) => {
    const updated = board.map((col) => {
      if (col.id === colId) {
        return {
          ...col,
          cards: [...col.cards, { id: generateId(), content: "New Card" }],
        };
      }
      return col;
    });
    updateBoard(updated);
  };

  const deleteCard = (colId: string, cardId: string) => {
    const updated = board.map((col) => {
      if (col.id === colId) {
        return {
          ...col,
          cards: col.cards.filter((card: any) => card.id !== cardId),
        };
      }
      return col;
    });
    updateBoard(updated);
  };

  const renameCard = (colId: string, cardId: string, content: string) => {
    const updated = board.map((col) => {
      if (col.id === colId) {
        return {
          ...col,
          cards: col.cards.map((card: any) =>
            card.id === cardId ? { ...card, content } : card
          ),
        };
      }
      return col;
    });
    updateBoard(updated);
  };

  const renameColumn = (colId: string, title: string) => {
    const updated = board.map((col) =>
      col.id === colId ? { ...col, title } : col
    );
    updateBoard(updated);
  };

  const addColumn = () => {
    const newCol = { id: generateId(), title: "New Column", cards: [] };
    const updated = [...board, newCol];
    updateBoard(updated);
  };

  const deleteColumn = (colId: string) => {
    const updated = board.filter((col) => col.id !== colId);
    updateBoard(updated);
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        updateBoard,
        addCard,
        deleteCard,
        addColumn,
        deleteColumn,
        renameCard,
        renameColumn,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export const useBoard = (initialBoard = []) => {
  const context = useContext(BoardContext);
  if (context === null) {
    const [board, setBoard] = useState(initialBoard);
    return { board, updateBoard: setBoard };
  }
  return context;
};
