import { log } from '../core/logger/logger';
import { Request, Response } from 'express';
import createMonthClosureUsecase from '../core/usecases/create-month-closure.usecase';
import monthClosurePrismaRepository from '../infra/month-closure.prisma-repository';
import MonthClosureRepository from '../core/repositories/month-closure.repository';
import userPrismaRepository from '../infra/user.prisma-repository';
import UserRepository from '../core/repositories/user.repository';

const postMonthClosureUsecaseAdapter = async (req: Request, res: Response) => {
  const { body } = req;
  const { user } = res.locals;
  body.user = user;
  log(
    '[postMonthClosureUsecaseAdapter]: save new month closure request received with body {}',
    body
  );
  const newMonthClosure = await createMonthClosureUsecase(
    body,
    monthClosurePrismaRepository as unknown as MonthClosureRepository,
    userPrismaRepository as unknown as UserRepository
  );
  log(
    `[postMonthClosureUsecaseAdapter]: new month closure [id]: ${newMonthClosure.id} saved`
  );
  const hateoas = {
    ...newMonthClosure,
    path: `/month-closures/${newMonthClosure.id}`
  };
  return res.status(201).json(hateoas);
};

export default postMonthClosureUsecaseAdapter;
