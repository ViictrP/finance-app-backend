import creditCardUseCase from '../../../../src/core/usecases/create-credit-card.usecase';
import { CreditCardRepository, UserRepository } from '../../../../src/core/repositories';

describe('creditCardUseCase', () => {
  const creditCard = {
    id: '1',
    title: 'Credit Card 1',
    description: 'Credit Card 1 Description',
    number: '1234567890123456',
    user: { id: '1' } as any,
    invoices: [],
    invoiceClosingDay: 15,
    createAt: new Date(),
    backgroundColor: '#000000',
    deleted: false
  };

  it('should throw an error when credit card information is invalid', async () => {
    const userRepository: Partial<UserRepository> = {
      get: jest.fn().mockResolvedValue({ id: '1' })
    };

    const repository: Partial<CreditCardRepository> = {
      get: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(creditCard)
    };

    try {
      await creditCardUseCase(creditCard, userRepository as UserRepository, repository as CreditCardRepository);
    } catch (error) {
      expect(error.message).toBe('the credit card Credit Card 1 is invalid');
    }
  });

  it('should create a new invoice for the credit card', async () => {
    const userRepository: Partial<UserRepository> = {
      get: jest.fn().mockResolvedValue({ id: '1' })
    };

    const repository: Partial<CreditCardRepository> = {
      get: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(creditCard)
    };

    await creditCardUseCase(creditCard, userRepository as UserRepository, repository as CreditCardRepository);

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...creditCard,
        invoices: expect.arrayContaining([
          expect.objectContaining({
            month: expect.any(String),
            year: expect.any(Number),
            isClosed: false
          })
        ])
      })
    );
  });

  it('should persist the new credit card', async () => {
    const userRepository: Partial<UserRepository> = {
      get: jest.fn().mockResolvedValue({ id: '1' })
    };

    const repository: Partial<CreditCardRepository> = {
      get: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue(creditCard)
    };

    const result = await creditCardUseCase(
      creditCard,
      userRepository as UserRepository,
      repository as CreditCardRepository
    );

    expect(repository.create).toHaveBeenCalledWith(creditCard);
    expect(result).toEqual(creditCard);
  });

  it('should throw an error if the credit card has invalid data', async () => {
    const creditCard = {
      id: '1',
      title: 'Credit Card 1',
      description: 'Credit Card 1 Description',
      number: '1234567890123456',
      user: { id: '1' } as any,
      invoices: [],
      invoiceClosingDay: 0,
      createAt: new Date(),
      backgroundColor: '#000000',
      deleted: false
    };

    const userRepository: Partial<UserRepository> = {
      get: jest.fn().mockResolvedValue({ id: '1' })
    };

    const repository: Partial<CreditCardRepository> = {
      get: jest.fn().mockResolvedValue(null)
    };

    try {
      await creditCardUseCase(creditCard, userRepository as UserRepository, repository as CreditCardRepository);
    } catch (error) {
      expect(error.message).toBe('the credit card Credit Card 1 is invalid');
    }
  });

  it('should throw an error if the user already has the credit card', async () => {
    const userRepository: Partial<UserRepository> = {
      get: jest.fn().mockResolvedValue({ id: '1' })
    };

    const repository: Partial<CreditCardRepository> = {
      get: jest.fn().mockResolvedValue(creditCard)
    };

    try {
      await creditCardUseCase(creditCard, userRepository as UserRepository, repository as CreditCardRepository);
    } catch (error) {
      expect(error.message).toBe(
        'User already has the credit card Credit Card 1'
      );
    }
  });
});
