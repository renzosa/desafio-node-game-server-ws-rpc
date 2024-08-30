import InMemoryDatabase from './InMemoryDatabase';
import { AuthResponse } from '../types';

class ActionService {
  private validActions: string[] = ['request', 'pay', 'skip', 'logout'];

  constructor(private database: InMemoryDatabase) {}

  performAction(username: string, token: string, action: string): AuthResponse {
    if (!token || this.database.getTokenOwner(token) !== username) {
      console.log(`User ${username} not authenticated!`);
      const userData = this.database.getUserData(username);
      return { success: false, message: 'Not authenticated', data: userData || undefined };
    }
    if (action === 'logout') {
      this.database.removeToken(token);
      console.log(`Connection closed for user ${username}.`);
      return { success: true, message: 'Connection closed' };
    } else if (this.validActions.includes(action)) {
      console.log(`User ${username} performed action: ${action}`);
      const userData = this.database.getUserData(username);
      return { success: true, message: `Action success: ${action}`, data: userData || undefined };
    }
    console.log(`Invalid action: ${action}`);
    return { success: false, message: 'Invalid action' };
  }
}

export default ActionService;