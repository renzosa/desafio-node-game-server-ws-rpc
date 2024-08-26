const { JSONRPCServer } = require('json-rpc-2.0');
const AuthService = require('./services/AuthService');
const ActionService = require('./services/ActionService');
const InMemoryDatabase = require('./services/InMemoryDatabase');

const database = new InMemoryDatabase();
const authService = new AuthService(database);
const actionService = new ActionService(database);

const rpcServer = new JSONRPCServer();

rpcServer.addMethod('login', ({ username, password }) => authService.login(username, password));
rpcServer.addMethod('logout', ({ username, token }) => authService.logout(username, token));
rpcServer.addMethod('action', ({ username, token, data }) => actionService.performAction(username, token, data));

module.exports = {
  rpcServer,
  database,
};
