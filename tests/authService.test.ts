import AuthService from '../src/services/AuthService';
import InMemoryDatabase from '../src/services/InMemoryDatabase';

describe('AuthService', () => {
  let authService: AuthService;
  let database: InMemoryDatabase;

  beforeEach(() => {
    database = new InMemoryDatabase();
    authService = new AuthService(database);
  });

  test('should login successfully with correct username and password', () => {
    const response = authService.login('renzo', '123mudar');
    expect(response.success).toBe(true);
    expect(response.message).toBe('Login successful');
    expect(response.token).toBeDefined();
  });

  test('should fail login with incorrect username', () => {
    const response = authService.login('user', '123mudar');
    expect(response.success).toBe(false);
    expect(response.message).toBe('Invalid username or password');
  });

  test('should fail login with incorrect password', () => {
    const response = authService.login('renzo', 'wrongpassword');
    expect(response.success).toBe(false);
    expect(response.message).toBe('Invalid username or password');
  });

  test('should logout successfully with correct username and token', () => {
    const loginResponse = authService.login('renzo', '123mudar');
    const token = loginResponse.token as string;
    const logoutResponse = authService.logout('renzo', token);
    expect(logoutResponse.success).toBe(true);
    expect(logoutResponse.message).toBe('Logout successful');
  });

  test('should fail logout with incorrect token', () => {
    const loginResponse = authService.login('renzo', '123mudar');
    const logoutResponse = authService.logout('renzo', (loginResponse.token as string) + 'invalidToken');
    expect(logoutResponse.success).toBe(false);
    expect(logoutResponse.message).toBe('Not authenticated');
  });
});