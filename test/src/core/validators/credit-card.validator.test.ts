import CreditCard from '../../../../src/core/entities/credit-card';
import creditCardValidator from '../../../../src/core/validators/credit-card.validator';

describe('Credit Card Validator', () => {
  it('Should return true if credit card is valid', () => {
    const creditCard: CreditCard = {
      id: 'id',
      title: 'title',
      description: 'description',
      number: '1111',
      user: {} as any,
      invoices: [],
      invoiceClosingDay: 1,
      createAt: new Date(),
      backgroundColor: 'bg-zinc-900',
      deleted: false
    };
    const valid = creditCardValidator(creditCard);

    expect(valid).toBeTruthy();
  });

  it('Should return false if credit card is valid', () => {
    const creditCard = {
      id: 'id',
      description: 'description',
      number: '1111',
      user: {} as any,
      invoices: [],
      invoiceClosingDay: 1,
      createAt: new Date()
    };
    const valid = creditCardValidator(creditCard as any);

    expect(valid).toBeFalsy();
  });
});
