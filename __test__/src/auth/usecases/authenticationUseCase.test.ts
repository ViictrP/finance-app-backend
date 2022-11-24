import { getUserUseCase } from '../../../../src/core/usecases';
import * as bcrypt from 'bcrypt';
import authenticationUseCase from '../../../../src/auth/usecases/authenticationUseCase';

jest.mock('.../../../../src/core/usecases/getUserUseCase');
jest.mock('bcrypt');

describe('authenticationUseCase', () => {
  const user = {
    email: 'myemail@email.com',
    password: 'myPassword'
  };

  const repository = {
    getMany: jest.fn()
  };

  beforeEach(() => {
    process.env.JWT_SECRET = 'secret';
  });

  it('Should authenticate', async () => {
    const useCase = getUserUseCase as jest.Mock;
    useCase.mockImplementation(() => (user));
    const bcryptMock = bcrypt as unknown as jest.Mock;
    (bcryptMock as any).compare.mockImplementation(() => true);

    const authentication = await authenticationUseCase({ ...user } as any, repository as any);
    expect(authentication).toBeTruthy();
    expect(authentication.accessToken).toBeDefined();
  });

  it('Should throw error if user doesnt exist', async () => {
    const useCase = getUserUseCase as jest.Mock;
    useCase.mockImplementation(() => null);
    const bcryptMock = bcrypt as unknown as jest.Mock;
    (bcryptMock as any).compare.mockImplementation(() => true);

    await expect(authenticationUseCase(user, repository as any))
      .rejects
      .toThrowError(new Error('user not found for email myemail@email.com'));
  });

  it('Should throw error if user password doesnt match', async () => {
    const useCase = getUserUseCase as jest.Mock;
    useCase.mockImplementation(() => user);
    const bcryptMock = bcrypt as unknown as jest.Mock;
    (bcryptMock as any).compare.mockImplementation(() => false);

    await expect(authenticationUseCase(user, repository as any))
      .rejects
      .toThrowError(new Error('invalid credentials'));
  });
});
