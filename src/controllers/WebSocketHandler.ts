import WebSocket from 'ws';
import { JSONRPCServer } from 'json-rpc-2.0';
import InMemoryDatabase from '../services/InMemoryDatabase';

interface ExtendedWebSocket extends WebSocket {
  username?: string;
  token?: string;
}

class WebSocketHandler {
  constructor(
    private wss: WebSocket.Server,
    private rpcServer: JSONRPCServer,
    private database: InMemoryDatabase
  ) {}

  handleConnection(ws: ExtendedWebSocket): void {
    console.log('New client connected to Game Server [TS]!');
    ws.send(JSON.stringify({ result: { message: 'Welcome to Game Server [TS]!' }, id: 0 }));

    ws.on('message', async (message: WebSocket.Data) => {
      const json = JSON.parse(message.toString());
      if (json.method) {
        console.log(`Endpoint called: ${json.method}`);
      }
      const response = await this.rpcServer.receive(json);

      if (response && json.method === 'login' && response.result && response.result.success) {
        ws.username = json.params.username;
        ws.token = response.result.token;
      }

      if (response) {
        ws.send(JSON.stringify(response));
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  }
}

export default WebSocketHandler;