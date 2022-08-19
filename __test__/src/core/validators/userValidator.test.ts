import { User } from '../../../../src/core/entities';
import { userValidator } from '../../../../src/core/validators';

describe('User validator', () => {

  it('Should return true if user is valid', () => {
    const user: User = {
      id: 'id',
      name: 'User',
      lastname: 'Lastname',
      email: 'a@a.com',
      password: '123456',
      active: true,
      createdAt: new Date(),
      salary: 1000,
      creditCards: [],
      transactions: []
    };
    const valid = userValidator(user);
    expect(valid).toBeTruthy();
  });

  it('Should return false if user is invalid', () => {
    const user = {
      id: 'id',
      name: null,
      lastname: 'Lastname',
      email: 'a@a.com',
      password: '123456',
      active: true,
      createdAt: new Date(),
      salary: 1000,
      creditCards: [],
      transactions: []
    };
    const valid = userValidator(user as any);
    expect(valid).toBeFalsy();
  });
});
