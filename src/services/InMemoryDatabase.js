class InMemoryDatabase {
  constructor() {
    this.users = {
      renzo: {
        password: '123mudar',
        name: 'Renzo Sá',
        credit: 1000.0,
      },
      fulano: {
        password: 'senha',
        name: 'Fulano de Tal',
        credit: 0.0,
      },
    };
    this.tokens = {};
  }

  getUser(username) {
    return this.users[username];
  }

  addToken(token, username) {
    this.tokens[token] = username;
  }

  getTokenOwner(token) {
    return this.tokens[token];
  }

  removeToken(token) {
    delete this.tokens[token];
  }

  tokenExists(token) {
    return !!this.tokens[token];
  }

  getUserData(username) {
    const user = this.getUser(username);

    if (user) {
      return {
        user: username,
        name: user.name,
        credit: user.credit
      };
    }
    return null;

  }

  getCredit(username) {
    const user = this.getUser(username);
    return user ? user.credit : null;
  }

  updateCredit(username, newCredit) {
    const user = this.getUser(username);
    if (user) {
      user.credit = newCredit;
    }
  }

}

module.exports = InMemoryDatabase;
