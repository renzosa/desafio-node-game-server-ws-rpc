const TokenService = require('./TokenService');

class AuthService {
  constructor(database) {
    this.database = database;
  }

  login(username, password) {
    const user = this.database.getUser(username);
    const storedPassword = (user) ? user.password : null;
    if (storedPassword && storedPassword === password) {
      const token = TokenService.generateUniqueToken(this.database);
      this.database.addToken(token, username);
      console.log(`User ${username} logged in successfully!`);
      return { success: true, message: 'Login successful', token, data: this.database.getUserData(username) };
    }
    console.log(`Failed login attempt for user: ${username}`);
    return { success: false, message: 'Invalid username or password' };
  }

  logout(username, token) {
    if (!token || this.database.getTokenOwner(token) !== username) {
      console.log(`User ${username} not authenticated!`);
      return { success: false, message: 'Not authenticated' };
    }
    this.database.removeToken(token);
    console.log(`User ${username} logged out successfully.`);
    return { success: true, message: 'Logout successful' };
  }
}

module.exports = AuthService;
