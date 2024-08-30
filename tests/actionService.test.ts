import ActionService from '../src/services/ActionService';
import InMemoryDatabase from '../src/services/InMemoryDatabase';

describe('ActionService', () => {
  let actionService: ActionService;
  let database: InMemoryDatabase;

  beforeEach(() => {
    database = new InMemoryDatabase();
    actionService = new ActionService(database);
  });

  test('should perform action successfully with valid token', () => {
    database.addToken('validToken', 'renzo');
    const response = actionService.performAction('renzo', 'validToken', 'request');
    expect(response.success).toBe(true);
    expect(response.message).toBe('Action success: request');
  });

  test('should fail action with invalid token', () => {
    const response = actionService.performAction('renzo', 'invalidToken', 'request');
    expect(response.success).toBe(false);
    expect(response.message).toBe('Not authenticated');
  });

  test('should fail action with invalid action', () => {
    database.addToken('validToken', 'renzo');
    const response = actionService.performAction('renzo', 'validToken', 'invalidAction');
    expect(response.success).toBe(false);
    expect(response.message).toBe('Invalid action');
  });

  test('should close connection on "logout" action', () => {
    database.addToken('validToken', 'renzo');
    const response = actionService.performAction('renzo', 'validToken', 'logout');
    expect(response.success).toBe(true);
    expect(response.message).toBe('Connection closed');
    expect(database.tokenExists('validToken')).toBe(false);
  });
});