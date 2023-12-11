const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // Handle the received message as needed
  });

  socket.on('close', (code, reason) => {
    console.log(`Connection closed with code ${code} and reason: ${reason}`);
  });

  socket.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
});

console.log('WebSocket server listening on port 3000');
