const crypto = require('crypto');

class TokenService {
  static generateUniqueToken(tokens) {
    let token;
    do {
      token = crypto.randomBytes(16).toString('hex');
    } while (tokens.tokenExists(token));
    return token;
  }
}

module.exports = TokenService;
