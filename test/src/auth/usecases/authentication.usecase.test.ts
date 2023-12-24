import getUserUsecase from '../../../../src/core/usecases/get-user.usecase';
import bcrypt from 'bcrypt';
import authenticationUsecase from '../../../../src/auth/usecases/authentication.usecase';
import User from '../../../../src/core/entities/user';
import UserRepository from '../../../../src/core/repositories/user.repository';

jest.mock<typeof getUserUsecase>(
  '.../../../../src/core/usecases/get-user.usecase'
);
jest.mock<typeof bcrypt>('bcrypt');

describe('authenticationUseCase', () => {
  const user: Partial<User> = {
    email: 'myemail@email.com',
    password: 'myPassword'
  };

  const repository: Partial<UserRepository> = {
    get: jest.fn()
  };

  beforeEach(() => {
    process.env.JWT_SECRET = 'secret';
  });

  it('Should authenticate', async () => {
    const useCase = getUserUsecase as unknown as jest.Mock<
      typeof getUserUsecase
    >;
    useCase.mockImplementation(() => () => Promise.resolve<User>(user as User));

    const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;
    bcryptMock.compare.mockImplementation(() => true);

    const authentication = await authenticationUsecase(
      user as User,
      repository as UserRepository
    );
    expect(authentication).toBeTruthy();
    expect(authentication.accessToken).toBeDefined();
  });

  it('Should throw error if user password doesnt match', async () => {
    const useCase = getUserUsecase as unknown as jest.Mock<
      typeof getUserUsecase
    >;
    useCase.mockImplementation(() => () => Promise.resolve<User>(user as User));

    const bcryptMock = bcrypt as unknown as jest.Mock;
    (bcryptMock as any).compare.mockImplementation(() => false);

    await expect(
      authenticationUsecase(user as User, repository as UserRepository)
    ).rejects.toThrowError(new Error('invalid credentials'));
  });
});
