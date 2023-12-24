import RecurringExpense from '../../../../src/core/entities/recurring-expense';
import recurringExpenseValidator from '../../../../src/core/validators/recurring-expense.validator';

describe('recurringExpenseValidator', () => {
  it('Should return true if the recurring expense is valid', () => {
    const data: RecurringExpense = {
      description: 'Description',
      amount: 1000.0
    } as RecurringExpense;
    const isValid = recurringExpenseValidator(data as any);

    expect(isValid).toBeTruthy();
  });

  it('Should return false if the recurring expense is invalid', () => {
    const data = {} as RecurringExpense;
    const isValid = recurringExpenseValidator(data as any);

    expect(isValid).toBeFalsy();
  });
});
