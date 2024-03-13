import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import updateCreditCardUsecase from '../core/usecases/update-credit-card.usecase';
import creditCardPrismaRepository from '../infra/credit-card.prisma-repository';
import CreditCardRepository from '../core/repositories/credit-card.repository';
import CreditCard from '../core/entities/credit-card';
import { RequestWithProfile } from './middlewares/profile.middleware';

const updateCreditCardUsecaseAdapter = async (req: Request, res: Response) => {
  const { params } = req;

  const body: Partial<CreditCard> = {
    id: params.id,
    title: req.body.title,
    description: req.body.description,
    number: req.body.number,
    backgroundColor: req.body.backgroundColor,
    invoiceClosingDay: req.body.invoiceClosingDay,
    user: (req as RequestWithProfile).profile
  };

  log('[updateCreditCardUsecaseAdapter]: update credit card request received with body {}', body);
  const updatedCreditCard = await updateCreditCardUsecase(
    body as CreditCard,
    creditCardPrismaRepository as unknown as CreditCardRepository
  );
  log(
    `[updateCreditCardUseCaseAdapter]: credit card data was updated [id]: ${updatedCreditCard.id}`
  );
  const hateoas = {
    ...updatedCreditCard,
    path: `/credit-cards/${updatedCreditCard.id}`
  };
  return res.status(200).json(hateoas);
};

export default updateCreditCardUsecaseAdapter;
