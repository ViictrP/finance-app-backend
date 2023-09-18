import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { updateCreditCardUsecase } from '../core/usecases';
import { creditCardPrismaRepository } from '../infra';
import { CreditCardRepository } from '../core/repositories';

const updateCreditCardUsecaseAdapter = async (req: Request, res: Response) => {
  const { body, params } = req;
  body.id = params.id;
  body.user = res.locals.user;
  log('[updateCreditCardUsecaseAdapter]: update credit card request received with body {}', body);
  const updatedCreditCard = await updateCreditCardUsecase(body, creditCardPrismaRepository as unknown as CreditCardRepository);
  log(`[updateCreditCardUseCaseAdapter]: credit card data was updated [id]: ${updatedCreditCard.id}`);
  const hateoas = { ...updatedCreditCard, path: `/credit-cards/${updatedCreditCard.id}` };
  return res.status(200).json(hateoas);
};

export default updateCreditCardUsecaseAdapter;
