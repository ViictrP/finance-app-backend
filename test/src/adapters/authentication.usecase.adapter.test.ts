import request from 'supertest';
import server from '../../../src/server';
import { User } from '../../../src/core/entities';
import { userPrismaRepository } from '../../../src/infra';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../../src/core/repositories';

jest.mock<typeof userPrismaRepository>('../../../src/infra/user.prisma-repository');
jest.mock<typeof bcrypt>('bcrypt');


describe('authenticationUseCaseAdapter', () => {

  beforeEach(() => {
    process.env.JWT_SECRET = 'secret';
  });

  it('Should return a valid token', (done) => {
    const hash = bcrypt as jest.Mocked<typeof bcrypt>;
    hash.compare.mockImplementation(() => Promise.resolve<boolean>(true));

    const user: Partial<User> = {
      id: 'test',
      email: 'a@a.com',
      password: 'password',
      monthClosures: []
    };

    const repository = userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    repository.get.mockImplementation(() => (Promise.resolve<User>(user as User)));

    request(server)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'a@a.com', password: 'password' })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201, done);
  });

  it('Should return an error if user doesnt exist', (done) => {
    const repository = userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    repository.get.mockImplementation(() => (Promise.resolve<User | null>(null)));

    request(server)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'a@a.com', password: 'password' })
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(404, 'user not found by filter [object Object]', done);
  });

  it('Should return an error if password doesnt match', (done) => {
    const hash = bcrypt as jest.Mocked<typeof bcrypt>;
    hash.compare.mockImplementation(() => Promise.resolve<boolean>(false));
    const user: Partial<User> = {
      id: 'test',
      email: 'a@a.com',
      password: 'password',
      monthClosures: []
    };

    const repository = userPrismaRepository as unknown as jest.Mocked<UserRepository>;
    repository.get.mockImplementation(() => (Promise.resolve<User>(user as User)));

    request(server)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send({ email: 'a@a.com', password: 'password' })
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(400, 'invalid credentials', done);
  });
});
