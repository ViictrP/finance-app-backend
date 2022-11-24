import { createCreditCardUseCase } from '../../../../src/core/usecases';
import { creditCardValidator } from '../../../../src/core/validators';

jest.mock('../../../../src/core/validators');

describe('createCreditCardUseCase', () => {
  const creditcard = {};
  const repository = {
    create: jest.fn()
  };
  const userRepository = {
    get: jest.fn()
  };
  const user = {};

  it('Should create a new credit card', async () => {
    const validator = creditCardValidator as jest.Mock;
    validator.mockImplementation(() => true);
    userRepository.get.mockImplementation(() => user);
    repository.create.mockImplementation(() => ({id: 'test'}));

    const creditCard = await createCreditCardUseCase(creditcard as any, userRepository as any, repository as any);
    expect(creditCard).toBeTruthy();
  });

  it('Should throw error if credit card isnt valid', async () => {
    const validator = creditCardValidator as jest.Mock;
    validator.mockImplementation(() => false);
    userRepository.get.mockImplementation(() => user);
    repository.create.mockImplementation(() => ({id: 'test'}));

    await expect(createCreditCardUseCase(creditcard as any, userRepository as any, repository as any))
      .rejects
      .toThrowError(new Error('the credit card undefined is invalid'));
  });
});
