import { getCreditCardsUsecase } from '../../../../src/core/usecases';

describe('GetCreditCardsUseCase', () => {
  const repository = {
    getMany: jest.fn()
  };

  it('Should return the list of credit cards', async () => {
    (repository.getMany as jest.Mock).mockImplementation(() => ([]));

    const results = await getCreditCardsUsecase({} as any, repository as any);
    expect(results).toBeTruthy();
  });
});
