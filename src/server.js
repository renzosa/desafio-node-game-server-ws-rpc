const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const { rpcServer, database } = require('./rpcServer');
const WebSocketHandler = require('./controllers/WebSocketHandler');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const wsHandler = new WebSocketHandler(wss, rpcServer, database);

wss.on('connection', (ws) => wsHandler.handleConnection(ws));

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
