const cors = require('cors');
const express = require('express');
const socket = require('socket.io');
const { createServer } = require('http');

const PORT = process.env.PORT ?? 3333;

const app = express();
const httpServer = createServer(app);

const io = socket(httpServer, { serveClient: false, cors: {
  origin: '*'
} });

io.on("connection", (socket) => {
  const type = socket.handshake.query.type;
  const name = socket.handshake.query.name;

  // O worker vai dizer qual é seu ID e começar a mandar as localizações
  console.log('A user connected');
  console.log(`Name: ${name}`);
  console.log(`Type: ${type}`);

  socket.on('location', data => {
    io.emit('location', {
      ...data,
      name,
      type,
      time: Date()
    })
    console.log(data)
  })

  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
});

app.get('/', (req, res) => {
  return res.json({
    message: 'Hello World!'
  })
})

httpServer.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});