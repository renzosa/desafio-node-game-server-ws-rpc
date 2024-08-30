import { User, UserData } from '../types';

class InMemoryDatabase {
  private users: { [key: string]: User };
  private tokens: { [key: string]: string };

  constructor() {
    this.users = {
      renzo: {
        password: '123mudar',
        name: 'Renzo Sá',
        credit: 1000.0,
        getData: function(): UserData {
          return {
            user: 'renzo',
            name: this.name,
            credit: this.credit
          };
        }
      },
      fulano: {
        password: 'senha',
        name: 'Fulano de Tal',
        credit: 0.0,
        getData: function(): UserData {
          return {
            user: 'fulano',
            name: this.name,
            credit: this.credit
          };
        }
      }
    };
    this.tokens = {};
  }

  getUser(username: string): User | undefined {
    return this.users[username];
  }

  addToken(token: string, username: string): void {
    this.tokens[token] = username;
  }

  getTokenOwner(token: string): string | undefined {
    return this.tokens[token];
  }

  removeToken(token: string): void {
    delete this.tokens[token];
  }

  tokenExists(token: string): boolean {
    return !!this.tokens[token];
  }

  getUserData(username: string): UserData | null {
    const user = this.getUser(username);
    return user ? user.getData() : null;
  }

  getCredit(username: string): number | null {
    const user = this.getUser(username);
    return user ? user.credit : null;
  }

  updateCredit(username: string, newCredit: number): void {
    const user = this.getUser(username);
    if (user) {
      user.credit = newCredit;
    }
  }
}

export default InMemoryDatabase;