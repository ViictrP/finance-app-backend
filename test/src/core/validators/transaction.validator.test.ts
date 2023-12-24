import Transaction from '../../../../src/core/entities/transaction';
import transactionValidator from '../../../../src/core/validators/transaction.validator';
import creditCardValidator from '../../../../src/core/validators/credit-card.validator';

describe('TransactionValidator', () => {
  it('Should return true if transaction is valid', () => {
    const transaction: Transaction = {
      id: 'id',
      amount: 1,
      description: 'test',
      isInstallment: false,
      installmentAmount: 1,
      installmentNumber: 1,
      createdAt: new Date(),
      date: new Date(),
      invoice: {} as any,
      user: {} as any,
      category: 'food' as 'food' | 'home' | 'credit-card' | 'shop' | 'other',
      deleted: false
    };
    const valid = transactionValidator(transaction);

    expect(valid).toBeTruthy();
  });

  it('Should return false if transaction is valid', () => {
    const transaction = {
      id: 'id'
    };
    const valid = creditCardValidator(transaction as any);

    expect(valid).toBeFalsy();
  });
});
