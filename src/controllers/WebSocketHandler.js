class WebSocketHandler {
  constructor(wss, rpcServer, database) {
    this.wss = wss;
    this.rpcServer = rpcServer;
    this.database = database;
  }

  handleConnection(ws) {
    console.log('New client connected');
    ws.send(JSON.stringify({ result: { message: 'Welcome to Game Server!' }, id: 0 }));

    ws.on('message', async (message) => {
      const json = JSON.parse(message);
      if (json.method) {
        console.log(`Endpoint called: ${json.method}`);
      }
      const response = await this.rpcServer.receive(json);

      if (json.method === 'login' && response.result.success) {
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

module.exports = WebSocketHandler;
