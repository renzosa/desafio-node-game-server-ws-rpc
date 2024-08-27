const WebSocket = require('ws');
const readline = require('readline-sync');

class Client {
  constructor(url) {
    this.token = null;
    this.username = '';
    this.ws = new WebSocket(url);

    this.setupWebSocketHandlers();
  }

  setupWebSocketHandlers() {
    this.ws.on('open', () => this.onOpen());
    this.ws.on('message', (message) => this.onMessage(message));
    this.ws.on('close', () => this.onClose());
    this.ws.on('error', (error) => this.onError(error));
  }

  onOpen() {
    console.log('Conectado ao servidor remoto.');
  }

  onMessage(message) {
    const response = JSON.parse(message);
    this.handleResponse(response);
  }

  onClose() {
    console.log('Conexão fechada.');
  }

  onError(error) {
    console.log('Erro na conexão:', error.message);
  }

  handleResponse(response) {
    if (response.id === 0) {
      console.log(response.result.message);
      this.solicitarLogin();
    } else if (response.id === 1) {
      this.handleLoginResponse(response);
    } else if (response.id === 2) {
      this.handleActionResponse(response);
    }
  }

  handleLoginResponse(response) {
    if (response.result && response.result.success) {
      this.token = response.result.token;
      console.log('Login bem-sucedido! \nToken recebido:', this.token);
      console.log(response.result.data);
      this.solicitarAcao();
    } else {
      console.log('Login falhou:', response.result.message);
      this.solicitarLogin();
    }
  }

  handleActionResponse(response) {
    if (response.result && response.result.success) {
      console.log('Ação realizada com sucesso:', response.result.message);
      console.log(response.result.data);
    } else {
      console.log('Falha na ação:', response.result.message);
    }
    this.solicitarAcao();
  }

  solicitarLogin() {
    this.username = readline.question('\nUsuário: ');
    const password = readline.question('Senha: ', { hideEchoBack: true });

    const loginRequest = this.createRequest('login', {
      username: this.username,
      password: password,
    }, 1);

    this.ws.send(JSON.stringify(loginRequest));
  }

  solicitarAcao() {
    const action = readline.question('\nDigite a ação desejada (request, pay, skip, logout, exit): ');

    if (action === 'exit') {
      console.log('\nDesconectando do servidor...');
      this.ws.close();
      return;
    }

    const method = action === 'logout' ? 'logout' : 'action';
    const id = action === 'logout' ? 0 : 2;

    const actionRequest = this.createRequest(method, {
      username: this.username,
      token: this.token,
      data: action,
    }, id);

    this.ws.send(JSON.stringify(actionRequest));
  }

  createRequest(method, params, id) {
    return {
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: id,
    };
  }
}

const client = new Client('ws://localhost:3000');