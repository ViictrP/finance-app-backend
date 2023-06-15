import { getUserUsecase } from '../../../../src/core/usecases';
import * as bcrypt from 'bcrypt';
import authenticationUsecase from '../../../../src/auth/usecases/authentication.usecase';

jest.mock('.../../../../src/core/usecases/get-user.usecase');
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
    const useCase = getUserUsecase as jest.Mock;
    useCase.mockImplementation(() => (user));
    const bcryptMock = bcrypt as unknown as jest.Mock;
    (bcryptMock as any).compare.mockImplementation(() => true);

    const authentication = await authenticationUsecase({ ...user } as any, repository as any);
    expect(authentication).toBeTruthy();
    expect(authentication.accessToken).toBeDefined();
  });

  it('Should throw error if user doesnt exist', async () => {
    const useCase = getUserUsecase as jest.Mock;
    useCase.mockImplementation(() => null);
    const bcryptMock = bcrypt as unknown as jest.Mock;
    (bcryptMock as any).compare.mockImplementation(() => true);

    await expect(authenticationUsecase(user, repository as any))
      .rejects
      .toThrowError(new Error('user not found for email myemail@email.com'));
  });

  it('Should throw error if user password doesnt match', async () => {
    const useCase = getUserUsecase as jest.Mock;
    useCase.mockImplementation(() => user);
    const bcryptMock = bcrypt as unknown as jest.Mock;
    (bcryptMock as any).compare.mockImplementation(() => false);

    await expect(authenticationUsecase(user, repository as any))
      .rejects
      .toThrowError(new Error('invalid credentials'));
  });
});
