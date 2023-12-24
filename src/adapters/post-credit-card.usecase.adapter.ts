import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import userPrismaRepository from '../infra/user.prisma-repository';
import createCreditCardUseCase from '../core/usecases/create-credit-card.usecase';
import UserRepository from '../core/repositories/user.repository';
import creditCardPrismaRepository from '../infra/credit-card.prisma-repository';
import CreditCardRepository from '../core/repositories/credit-card.repository';

const postCreditCardUsecaseAdapter = async (req: Request, res: Response) => {
  const { body } = req;
  const { user } = res.locals;
  body.user = user;
  log(
    '[postCreditCardUsecaseAdapter]: save credit card request received with body {}',
    body
  );
  const newCreditCard = await createCreditCardUseCase(
    body,
    userPrismaRepository as unknown as UserRepository,
    creditCardPrismaRepository as unknown as CreditCardRepository
  );
  log(
    `[createCreditCardUseCaseAdapter]: new credit card [id]: ${newCreditCard.id} saved`
  );
  const hateoas = {
    ...newCreditCard,
    path: `/credit-cards/${newCreditCard.id}`
  };
  return res.status(201).json(hateoas);
};

export default postCreditCardUsecaseAdapter;
