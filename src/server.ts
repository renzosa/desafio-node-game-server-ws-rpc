import express from 'express';
import WebSocket from 'ws';
import http from 'http';
import { rpcServer, database } from './rpcServer';
import WebSocketHandler from './controllers/WebSocketHandler';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const wsHandler = new WebSocketHandler(wss, rpcServer, database);

wss.on('connection', (ws: WebSocket) => wsHandler.handleConnection(ws));

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});