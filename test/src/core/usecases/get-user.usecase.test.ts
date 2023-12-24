import getUserUsecase from '../../../../src/core/usecases/get-user.usecase';
import User from '../../../../src/core/entities/user';

describe('GetUserUseCase', () => {
  const repository = {
    get: jest.fn() as any,
    create: jest.fn() as any,
    update: jest.fn
  };

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Should return the user', async () => {
    (repository.get as jest.Mock).mockImplementation(() => ({
      name: 'Test',
      monthClosures: []
    }));
    const user = {
      name: 'Test'
    };

    const result = (await getUserUsecase(
      user as User,
      repository as any
    )) as User;

    expect(result.name).toStrictEqual(user.name);
  });

  it('Should throw error if user doesnt exist', async () => {
    const user = {
      name: 'Test'
    };

    await expect(
      getUserUsecase(user as User, repository as any)
    ).rejects.toThrowError(
      new Error(`user not found by filter [object Object]`)
    );
  });
});
