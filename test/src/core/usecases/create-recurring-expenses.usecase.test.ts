import createRecurringExpensesUsecase from '../../../../src/core/usecases/create-recurring-expenses.usecase';

describe('createRecurringExpensesUseCase', () => {
  const user = { id: 'test' };
  const repository = {
    create: jest.fn()
  };

  const userRepository = {
    get: jest.fn()
  };

  it('Should create recurring expense with success', async () => {
    const expense = { description: 'Description', amount: 1000 };
    repository.create.mockImplementation(() => expense);
    userRepository.get.mockImplementation(() => user);

    const created = await createRecurringExpensesUsecase(
      expense as any,
      repository as any,
      userRepository as any
    );

    expect(created).toEqual(expense);
  });

  it('Should throw error if recurring expense is invalid', async () => {
    const expense = { description: null, amount: 1000 };
    repository.create.mockImplementation(() => expense);
    userRepository.get.mockImplementation(() => user);

    await expect(
      createRecurringExpensesUsecase(
        expense as any,
        repository as any,
        userRepository as any
      )
    ).rejects.toThrowError(
      new Error('The recurring expense null has invalid data')
    );
  });
});
