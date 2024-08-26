class ActionService {
  constructor(database) {
    this.database = database;
    this.validActions = ['request', 'pay', 'skip', 'logout'];
  }

  performAction(username, token, action) {
    if (!token || this.database.getTokenOwner(token) !== username) {
      console.log(`User ${username} not authenticated!`);
      return { success: false, message: 'Not authenticated', data: this.database.getUserData(username) };
    }
    if (action === 'logout') {
      this.database.removeToken(token);
      console.log(`Connection closed for user ${username}.`);
      return { success: true, message: 'Connection closed' };
    } else if (this.validActions.includes(action)) {
      console.log(`User ${username} performed action: ${action}`);
      return { success: true, message: `Action success: ${action}`, data: this.database.getUserData(username) };
    }
    console.log(`Invalid action: ${action}`);
    return { success: false, message: 'Invalid action' };
  }
}

module.exports = ActionService;
