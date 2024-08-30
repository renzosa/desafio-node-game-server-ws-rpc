import crypto from 'crypto';
import InMemoryDatabase from './InMemoryDatabase';

class TokenService {
  static generateUniqueToken(database: InMemoryDatabase): string {
    let token: string;
    do {
      token = crypto.randomBytes(16).toString('hex');
    } while (database.tokenExists(token));
    return token;
  }
}

export default TokenService;