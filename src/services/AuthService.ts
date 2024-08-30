import TokenService from './TokenService';
import InMemoryDatabase from './InMemoryDatabase';
import { AuthResponse } from '../types';

class AuthService {
  constructor(private database: InMemoryDatabase) {}

  login(username: string, password: string): AuthResponse {
    const user = this.database.getUser(username);
    if (user && user.password === password) {
      const token = TokenService.generateUniqueToken(this.database);
      this.database.addToken(token, username);
      console.log(`User ${username} logged in successfully!`);
      const userData = this.database.getUserData(username);
      return { success: true, message: 'Login successful', token, data: userData || undefined };
    }
    console.log(`Failed login attempt for user: ${username}`);
    return { success: false, message: 'Invalid username or password' };
  }

  logout(username: string, token: string): AuthResponse {
    if (!token || this.database.getTokenOwner(token) !== username) {
      console.log(`User ${username} not authenticated!`);
      return { success: false, message: 'Not authenticated' };
    }
    this.database.removeToken(token);
    console.log(`User ${username} logged out successfully.`);
    return { success: true, message: 'Logout successful' };
  }
}

export default AuthService;