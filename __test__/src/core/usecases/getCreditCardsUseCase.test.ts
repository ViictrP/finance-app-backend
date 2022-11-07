import { getCreditCardsUseCase } from '../../../../src/core/usecases';

describe('GetCreditCardsUseCase', () => {
  const repository = {
    getMany: jest.fn()
  };

  it('Should return the list of credit cards', async () => {
    (repository.getMany as jest.Mock).mockImplementation(() => ([]));

    const results = await getCreditCardsUseCase({} as any, repository as any);
    expect(results).toBeTruthy();
  });
});
