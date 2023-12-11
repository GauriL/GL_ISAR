const WebSocket = require('ws');

const socket = new WebSocket('ws://localhost:3000');

socket.on('open', () => {
  console.log('Connected to WebSocket server');
  // Send a test message after connecting
  socket.send('Hello, WebSocket Server!');
});

socket.on('message', (message) => {
  console.log(`Received from server: ${message}`);
});

socket.on('close', (code, reason) => {
  console.log(`Connection closed with code ${code} and reason: ${reason}`);
});

socket.on('error', (err) => {
  console.error('WebSocket error:', err);
});