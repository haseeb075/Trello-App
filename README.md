rello Realtime App (Next.js 14 + WebSockets)

A simple Trello-style real-time Kanban board built with Next.js 14 App Router, Socket.io, Tailwind CSS, and React Context API. Users can collaboratively add, move, and edit cards in real-time across columns.

✅ Features

🔁 Real-time collaboration via WebSockets

🧠 Global state management with React Context API

🧱 Drag & Drop with react-beautiful-dnd

⚡ Optimistic UI updates for smooth UX

💡 Editable card and column titles (inline)

🔨 Server-side rendering (SSR) of initial board state

📝 File-based persistent storage (board.json)

🎨 Tailwind CSS styling

📁 Folder Structure

trello-realtime-app/
├── src/
│   ├── app/
│   │   ├── page.tsx              # SSR initial board render
│   │   └── api/
│   │       └── initial-board/   # API route for loading board data
│   ├── components/              # Board, Column, Card components
│   ├── context/BoardContext.tsx # WebSocket + board logic
│   └── styles/                  # Global styles (Tailwind)
├── data/                        # JSON storage for board state
│   └── board.json
├── public/
├── server.js                    # Custom HTTP + Socket.io server
├── next.config.mjs              # Next.js config
├── tailwind.config.ts
├── package.json

🛠 Setup Instructions

# 1. Clone the repository
$ git clone https://github.com/your-username/trello-realtime-app.git
$ cd trello-realtime-app

# 2. Install dependencies
$ npm install

# 3. Start the server (with custom Socket.io support)
$ node server.js

# App will run at http://localhost:3000

✅ Open in two browser windows to see real-time syncing.

🧠 Architectural Decisions

🔌 WebSockets with socket.io

Enables real-time updates between multiple users.

Socket server runs via a custom Express HTTP wrapper in server.js.

⚛️ React Context for Global State

All board/card/column logic is centralized inside BoardContext.tsx.

Keeps UI components focused only on rendering and interactions.

⚙️ App Router + SSR

Initial board state is rendered server-side using Next.js 14 App Router and fetch.

📂 File-based Persistence

Board state is saved in data/board.json (read from API route).

Simulates database persistence with no additional infrastructure.

🎨 Tailwind CSS

Used for layout, spacing, and responsive UI styling.

🔁 Real-Time Update Flow

One client makes a change (e.g. add card).

It updates board locally (optimistic UI) and emits to server.

Server broadcasts update to all connected clients.

All clients re-render with updated board state.

✨ Demo Use Case

Open http://localhost:3000 in two browser windows:

Add or rename a card in one window

Drag it to another column

Instantly see it reflected in the other window 🎉

🧩 Possible Enhancements

🧠 Add user auth (e.g. with Clerk/Auth.js)

🗃 Use SQLite or MongoDB instead of JSON

📥 Add modal UI for adding/editing cards and columns

📤 Deploy to Vercel with Edge functions + DB