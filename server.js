// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' });

const handle = app.getRequestHandler();

let boardState = [
  { id: 'todo', title: 'To Do', cards: [{ id: 'card1', content: 'First task' }] },
  { id: 'doing', title: 'Doing', cards: [] },
  { id: 'done', title: 'Done', cards: [] },
];

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  io.on('connection', socket => {
    console.log('🔌 Socket connected');

    socket.emit('board', boardState);

    socket.on('update_board', updated => {
      boardState = updated;
      socket.broadcast.emit('board', boardState);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Socket disconnected');
    });
  });

  server.listen(3000, () => {
    console.log('✅ Custom Socket.IO server running');
    console.log('> Ready on http://localhost:3000');
  });
});
