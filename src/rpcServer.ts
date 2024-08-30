import { JSONRPCServer } from 'json-rpc-2.0';
import AuthService from './services/AuthService';
import ActionService from './services/ActionService';
import InMemoryDatabase from './services/InMemoryDatabase';
import { AuthResponse } from './types';

const database = new InMemoryDatabase();
const authService = new AuthService(database);
const actionService = new ActionService(database);

const rpcServer = new JSONRPCServer();

rpcServer.addMethod('login', ({ username, password }: { username: string; password: string }): AuthResponse => 
  authService.login(username, password)
);

rpcServer.addMethod('logout', ({ username, token }: { username: string; token: string }): AuthResponse => 
  authService.logout(username, token)
);

rpcServer.addMethod('action', ({ username, token, data }: { username: string; token: string; data: string }): AuthResponse => 
  actionService.performAction(username, token, data)
);

export { rpcServer, database };