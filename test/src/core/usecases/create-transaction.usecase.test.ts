import createTransactionUsecase from '../../../../src/core/usecases/create-transaction.usecase';
import Transaction from '../../../../src/core/entities/transaction';

describe('createTransactionUsecase', () => {
  const creditCardRepository = {
    create: jest.fn(),
    getMany: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    deleteOne: jest.fn()
  };
  const repository = {
    create: jest.fn(),
    createInvoiceTransaction: jest.fn(),
    get: jest.fn(),
    getManyByUserMonthAndYear: jest.fn(),
    update: jest.fn(),
    deleteTransaction: jest.fn()
  };

  it('should throw error if transaciton is invalid', async () => {
    try {
      const transaction: Partial<Transaction> = {
        description: 'invalid transaction'
      };
      await createTransactionUsecase(
        transaction as Transaction,
        creditCardRepository,
        repository
      );
    } catch (error: any) {
      expect(error.message).toStrictEqual(
        'the transaction invalid transaction is invalid'
      );
    }
  });

  it('should create a valid transaction without an invoice', async () => {
    const transaction: Partial<Transaction> = {
      id: '1',
      amount: 100,
      description: 'Transaction 1',
      isInstallment: false,
      installmentAmount: 1,
      installmentNumber: 1,
      createdAt: new Date(),
      date: new Date(),
      user: { id: '1', name: 'John Doe' } as any,
      category: 'food',
      deleted: false
    };
    await createTransactionUsecase(
      transaction as Transaction,
      creditCardRepository,
      repository
    );
    expect(repository.create).toHaveBeenCalledWith(transaction);
  });

  it('should create a valid transaction within an invoice', async () => {
    const transaction: Partial<Transaction> = {
      id: '1',
      amount: 100,
      description: 'Transaction 1',
      isInstallment: false,
      installmentAmount: 1,
      installmentNumber: 1,
      createdAt: new Date(),
      date: new Date(),
      user: { id: '1', name: 'John Doe' } as any,
      category: 'food',
      deleted: false,
      invoice: {
        month: 'OUT',
        year: 2023,
        isClosed: false,
        creditCard: {
          id: '1',
          name: 'Credit Card 1',
          invoiceClosingDay: 10,
          invoices: []
        }
      } as any
    };
    jest
      .spyOn(creditCardRepository, 'get')
      .mockImplementation(() => transaction.invoice!.creditCard);

    await createTransactionUsecase(
      transaction as Transaction,
      creditCardRepository,
      repository
    );

    expect(repository.createInvoiceTransaction).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 100,
        category: 'food',
        createdAt: expect.any(Date),
        date: expect.any(Date),
        deleted: false,
        description: 'Transaction 1',
        id: '1',
        installmentAmount: 1,
        installmentId: expect.any(String),
        installmentNumber: 1,
        invoice: {
          creditCard: {
            id: '1',
            invoiceClosingDay: 10,
            invoices: [],
            name: 'Credit Card 1'
          },
          isClosed: false,
          month: expect.any(String),
          year: expect.any(Number)
        },
        isInstallment: false,
        user: { id: '1', name: 'John Doe' }
      })
    );
  });

  it('should create a valid transaction within an invoice on january of next year', async () => {
    const transaction: Partial<Transaction> = {
      id: '1',
      amount: 100,
      description: 'Transaction 1',
      isInstallment: false,
      installmentAmount: 1,
      installmentNumber: 1,
      createdAt: new Date('2023-12-11'),
      date: new Date('2023-12-11'),
      user: { id: '1', name: 'John Doe' } as any,
      category: 'food',
      deleted: false,
      invoice: {
        month: 'JAN',
        year: 2024,
        isClosed: false,
        creditCard: {
          id: '1',
          name: 'Credit Card 1',
          invoiceClosingDay: 1,
          invoices: []
        }
      } as any
    };
    jest
      .spyOn(creditCardRepository, 'get')
      .mockImplementation(() => transaction.invoice!.creditCard);
    await createTransactionUsecase(
      transaction as Transaction,
      creditCardRepository,
      repository
    );

    expect(repository.createInvoiceTransaction).toHaveBeenCalledWith(
      expect.objectContaining(transaction)
    );
  });

  it('should create a transaction with installment within an invoice', async () => {
    const transaction: Partial<Transaction> = {
      id: '1',
      amount: 100,
      description: 'Transaction 1',
      isInstallment: true,
      installmentAmount: 3,
      installmentNumber: 1,
      createdAt: new Date(),
      date: new Date(),
      user: { id: '1', name: 'John Doe' } as any,
      category: 'food',
      deleted: false,
      invoice: {
        id: '1',
        month: 'January',
        year: 2022,
        isClosed: false,
        creditCard: {
          id: '1',
          name: 'Credit Card 1',
          invoiceClosingDay: 10,
          invoices: []
        }
      } as any
    };
    jest
      .spyOn(creditCardRepository, 'get')
      .mockImplementation(() => transaction.invoice!.creditCard);
    await createTransactionUsecase(
      transaction as Transaction,
      creditCardRepository,
      repository
    );
    expect(repository.createInvoiceTransaction).toHaveBeenCalledTimes(3);
  });

  it('should create a transaction with installment amount of 1 within an invoice', async () => {
    const transaction: Partial<Transaction> = {
      id: '1',
      amount: 100,
      description: 'Transaction 1',
      isInstallment: true,
      installmentAmount: 1,
      installmentNumber: 1,
      createdAt: new Date('2023-09-11T15:31:33.695Z'),
      date: new Date('2023-09-11T15:31:33.695Z'),
      user: { id: '1', name: 'John Doe' } as any,
      category: 'food',
      deleted: false,
      invoice: {
        month: 'OUT',
        year: 2023,
        isClosed: false,
        creditCard: {
          id: '1',
          name: 'Credit Card 1',
          invoiceClosingDay: 10,
          invoices: []
        }
      } as any
    };
    jest
      .spyOn(creditCardRepository, 'get')
      .mockImplementation(() => transaction.invoice!.creditCard);
    await createTransactionUsecase(
      transaction as Transaction,
      creditCardRepository,
      repository
    );
    expect(repository.createInvoiceTransaction).toHaveBeenCalledWith(
      expect.objectContaining(transaction)
    );
  });
});
