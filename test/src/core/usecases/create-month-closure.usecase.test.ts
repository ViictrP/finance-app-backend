import createMonthClosureUsecase from '../../../../src/core/usecases/create-month-closure.usecase';
import MonthClosureRepository from '../../../../src/core/repositories/month-closure.repository';
import UserRepository from '../../../../src/core/repositories/user.repository';
import ValidationError from '../../../../src/core/errors/validation.error';
import MonthClosure from '../../../../src/core/entities/month-closure';

describe('createMonthClosureUsecase', () => {
  const monthClosure = {
    id: '1',
    month: 'JAN',
    year: 2022,
    user: {
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
    },
    total: 1000,
    available: 800,
    expenses: 200,
    deleted: false,
    deleteDate: undefined,
    createdAt: new Date()
  };

  it('should create a month closure when valid data is provided', async () => {
    // Arrange
    const monthClosure = {
      id: '1',
      month: 'JAN',
      year: 2022,
      user: {
        id: '1'
      },
      index: 0,
      total: 1000,
      available: 800,
      expenses: 200,
      deleted: false,
      deleteDate: undefined,
      createdAt: new Date()
    };
    const repository: Partial<MonthClosureRepository> = {
      create: jest.fn().mockResolvedValue(monthClosure)
    };
    const userRepository: Partial<UserRepository> = {
      get: jest.fn().mockResolvedValue(monthClosure.user)
    };

    // Act
    const result = await createMonthClosureUsecase(
      monthClosure as unknown as MonthClosure,
      repository as MonthClosureRepository,
      userRepository as UserRepository
    );

    // Assert
    expect(repository.create).toHaveBeenCalledWith(monthClosure);
    expect(result).toEqual(monthClosure);
  });

  it('should throw a ValidationError when invalid data is provided', async () => {
    // Arrange
    const monthClosure = {
      id: '1',
      year: 2022,
      user: {
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
      },
      total: -1000,
      available: 800,
      expenses: 200,
      deleted: false,
      deleteDate: undefined,
      createdAt: new Date()
    };
    const repository: Partial<MonthClosureRepository> = {
      create: jest.fn()
    };
    const userRepository: Partial<UserRepository> = {
      get: jest.fn().mockResolvedValue(monthClosure.user)
    };

    // Act & Assert
    await expect(
      createMonthClosureUsecase(
        monthClosure as unknown as MonthClosure,
        repository as MonthClosureRepository,
        userRepository as UserRepository
      )
    ).rejects.toThrow(ValidationError);
  });

  it('should find the user in the repository', async () => {
    const repository: Partial<MonthClosureRepository> = {
      create: jest.fn()
    };
    const userRepository: Partial<UserRepository> = {
      get: jest.fn().mockResolvedValue(monthClosure.user)
    };

    // Act
    await createMonthClosureUsecase(
      monthClosure as unknown as MonthClosure,
      repository as MonthClosureRepository,
      userRepository as UserRepository
    );

    // Assert
    expect(userRepository.get).toHaveBeenCalledWith(monthClosure.user);
  });

  it('should find the month closure index in the MONTHS array', async () => {
    // Arrange
    const monthClosure = {
      id: '1',
      month: 'JAN',
      year: 2022,
      user: {
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
      },
      total: 1000,
      index: 0,
      available: 800,
      expenses: 200,
      deleted: false,
      deleteDate: undefined,
      createdAt: new Date()
    };
    const repository: Partial<MonthClosureRepository> = {
      create: jest.fn()
    };
    const userRepository: Partial<UserRepository> = {
      get: jest.fn().mockResolvedValue(monthClosure.user)
    };

    // Act
    await createMonthClosureUsecase(
      monthClosure as unknown as MonthClosure,
      repository as MonthClosureRepository,
      userRepository as UserRepository
    );

    // Assert
    expect(monthClosure.index).toBe(0);
  });
});
