import createUserUsecase from '../../../../src/core/usecases/create-user.usecase';
import UserRepository from '../../../../src/core/repositories/user.repository';
import User from '../../../../src/core/entities/user';
import bCrypt from 'bcrypt';
import ValidationError from '../../../../src/core/errors/validation.error';

describe('createUserUsecase', () => {
  it('should create a new user with valid data and return it', async () => {
    const user: Partial<User> = {
      id: '1',
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      active: true,
      password: 'password',
      createdAt: new Date('2023-09-11T15:44:58.197Z'),
      creditCards: [],
      transactions: [],
      recurringExpenses: [],
      monthClosures: [],
      delete: false
    };
    const repository: Partial<UserRepository> = {
      create: jest.fn().mockResolvedValue(user)
    };
    const result = await createUserUsecase(
      user as User,
      repository as UserRepository
    );
    expect(result).toEqual(user);
    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        active: true,
        creditCards: [],
        delete: false,
        email: 'john.doe@example.com',
        id: '1',
        lastname: 'Doe',
        monthClosures: [],
        name: 'John',
        recurringExpenses: [],
        transactions: []
      })
    );
  });

  it('should encrypt the password before persisting the user', async () => {
    const user = {
      id: '1',
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      active: true,
      createdAt: new Date(),
      creditCards: [],
      transactions: [],
      recurringExpenses: [],
      monthClosures: [],
      delete: false
    };
    const hashedUser = { ...user, password: 'hashedPassword' };
    const repository: Partial<UserRepository> = {
      create: jest.fn().mockResolvedValue(hashedUser)
    };
    bCrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
    const result = await createUserUsecase(user, repository as UserRepository);
    expect(result).toEqual(hashedUser);
    expect(bCrypt.hash).toHaveBeenCalledWith(user.password, 12);
    expect(repository.create).toHaveBeenCalledWith(hashedUser);
  });

  it('should throw a validation error if the user data is invalid', async () => {
    const user: Partial<User> = {
      id: '1',
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      active: true,
      createdAt: new Date(),
      creditCards: [],
      transactions: [],
      recurringExpenses: [],
      monthClosures: [],
      delete: false
    };
    const repository: Partial<UserRepository> = {
      create: jest.fn().mockResolvedValue(user)
    };

    await expect(
      createUserUsecase(user as User, repository as UserRepository)
    ).rejects.toThrow(ValidationError);
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('should persist the new user with the encrypted password', async () => {
    // Arrange
    const user = {
      id: '1',
      name: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      active: true,
      createdAt: new Date(),
      creditCards: [],
      transactions: [],
      recurringExpenses: [],
      monthClosures: [],
      delete: false
    };
    const hashedUser = { ...user, password: 'hashedPassword' };
    const repository: Partial<UserRepository> = {
      create: jest.fn().mockResolvedValue(hashedUser)
    };
    bCrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

    const result = await createUserUsecase(user, repository as UserRepository);

    expect(result).toEqual(hashedUser);
    expect(bCrypt.hash).toHaveBeenCalledWith(user.password, 12);
    expect(repository.create).toHaveBeenCalledWith(hashedUser);
  });
});
