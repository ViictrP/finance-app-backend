import getInvoiceUsecase from '../../../../src/core/usecases/get-invoice.usecase';

describe('GetInvoiceUseCase', () => {
  const repository = {
    get: jest.fn()
  };

  it('Should return the invoice', async () => {
    (repository.get as jest.Mock).mockImplementation(() => ({
      month: 'JUN'
    }));
    const invoice = await getInvoiceUsecase(
      { month: 'JUN' } as any,
      repository
    );
    expect(invoice.month).toStrictEqual('JUN');
  });
});
