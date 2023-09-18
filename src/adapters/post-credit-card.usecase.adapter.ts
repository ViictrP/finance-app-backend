import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { creditCardPrismaRepository, userPrismaRepository } from '../infra';
import { createCreditCardUseCase } from '../core/usecases';
import { CreditCardRepository, UserRepository } from '../core/repositories';

const postCreditCardUsecaseAdapter = async (req: Request, res: Response) => {
  const { body } = req;
  const { user } = res.locals;
  body.user = user;
  log('[postCreditCardUsecaseAdapter]: save credit card request received with body {}', body);
  const newCreditCard = await createCreditCardUseCase(body, userPrismaRepository as unknown as UserRepository, creditCardPrismaRepository as unknown as CreditCardRepository);
  log(`[createCreditCardUseCaseAdapter]: new credit card [id]: ${newCreditCard.id} saved`);
  const hateoas = { ...newCreditCard, path: `/credit-cards/${newCreditCard.id}` };
  return res.status(201).json(hateoas);
};

export default postCreditCardUsecaseAdapter;
