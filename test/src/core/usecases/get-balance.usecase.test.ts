import { UserRepository } from '../../../../src/core/repositories';
import { getBalanceUsecase } from '../../../../src/core/usecases';
import { User } from '../../../../src/core/entities';
import { RequestError } from '../../../../src/core/errors/request.error';

describe('getBalanceUsecase', () => {
  type TransactionFilter = {
    user: User;
    month: string;
    year: number;
  }

  // Tests that the function returns a Balance object with correct salary, expenses, and available properties when given a valid TransactionFilter and UserRepository
  it('should return a Balance object with correct salary, expenses, and available properties when given a valid TransactionFilter and UserRepository', async () => {
    // Mock UserRepository
    const mockUserRepository: UserRepository = {
      create: jest.fn(),
      get: jest.fn().mockResolvedValue({
        creditCards: [],
        transactions: [],
        recurringExpenses: [],
        salary: 5000
      }),
      update: jest.fn(),
      deleteOne: jest.fn()
    };

    // Define the filter
    const filter = {
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
      month: 'January',
      year: 2022
    };

    // Call the function
    const result = await getBalanceUsecase(filter, mockUserRepository);

    // Assert the result
    expect(result.salary).toBe(5000);
    expect(result.expenses).toBe(0);
    expect(result.available).toBe(5000);
  });

  // Tests that the function returns a Balance object with correct creditCardExpenses property when given a valid TransactionFilter and UserRepository
  it('should return a Balance object with correct creditCardExpenses property when given a valid TransactionFilter and UserRepository', async () => {
    // Mock UserRepository
    const mockUserRepository: UserRepository = {
      create: jest.fn(),
      get: jest.fn().mockResolvedValue({
        creditCards: [
          {
            id: '1',
            title: 'Credit Card 1',
            description: 'Credit Card 1',
            number: '1234567890',
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
            invoices: [
              {
                id: '1',
                month: 'January',
                year: 2022,
                isClosed: true,
                creditCard: {
                  id: '1',
                  title: 'Credit Card 1',
                  description: 'Credit Card 1',
                  number: '1234567890',
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
                  invoices: [],
                  invoiceClosingDay: 1,
                  createAt: new Date(),
                  backgroundColor: '#FFFFFF',
                  deleted: false
                },
                transactions: [
                  {
                    id: '1',
                    amount: 100,
                    description: 'Transaction 1',
                    isInstallment: false,
                    installmentAmount: 0,
                    installmentNumber: 0,
                    createdAt: new Date(),
                    date: new Date(),
                    invoice: null,
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
                    category: 'food',
                    deleted: false
                  }
                ],
                createdAt: new Date()
              }
            ],
            invoiceClosingDay: 1,
            createAt: new Date(),
            backgroundColor: '#FFFFFF',
            deleted: false
          }
        ],
        transactions: [],
        recurringExpenses: [],
        salary: 0
      }),
      update: jest.fn(),
      deleteOne: jest.fn()
    };

    // Define the filter
    const filter: TransactionFilter = {
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
      month: 'January',
      year: 2022
    };

    // Call the function
    const result = await getBalanceUsecase(filter, mockUserRepository);

    // Assert the result
    expect(result.creditCardExpenses).toEqual({ '1': 100 });
  });

  // Tests that the function throws a RequestError when given a TransactionFilter without a user property
  it('should throw a RequestError when given a TransactionFilter without a user property', async () => {
    // Mock UserRepository
    const mockUserRepository: UserRepository = {
      create: jest.fn(),
      get: jest.fn(),
      update: jest.fn(),
      deleteOne: jest.fn()
    };

    // Define the filter without user property
    const filter: Partial<TransactionFilter> = {
      month: 'January',
      year: 2022
    };

    // Call the function and expect it to throw a RequestError
    await expect(getBalanceUsecase(filter as TransactionFilter, mockUserRepository)).rejects.toThrow(RequestError);
  });

  // Tests that the function returns a Balance object with 0 expenses and correct salary and available properties when given a User with no transactions, recurringExpenses, or creditCards
  it('should return a Balance object with 0 expenses and correct salary and available properties when given a User with no transactions, recurringExpenses, or creditCards', async () => {
    // Mock UserRepository
    const mockUserRepository: UserRepository = {
      create: jest.fn(),
      get: jest.fn().mockResolvedValue({
        creditCards: [],
        transactions: [],
        recurringExpenses: [],
        salary: 5000
      }),
      update: jest.fn(),
      deleteOne: jest.fn()
    };

    // Define the filter
    const filter: TransactionFilter = {
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
      month: 'January',
      year: 2022
    };

    // Call the function
    const result = await getBalanceUsecase(filter, mockUserRepository);

    // Assert the result
    expect(result.expenses).toBe(0);
    expect(result.salary).toBe(5000);
    expect(result.available).toBe(5000);
  });

});
