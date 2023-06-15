import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { updateCreditCardUsecase } from '../core/usecases';
import { creditCardPrismaRepository } from '../infra';

const updateCreditCardUsecaseAdapter = async (req: Request, res: Response) => {
  try {
    const { body, params } = req;
    body.id = params.id;
    body.user = res.locals.user;
    log('[updateCreditCardUsecaseAdapter]: update credit card request received with body {}', body);
    const updatedCreditCard = await updateCreditCardUsecase(body, creditCardPrismaRepository as any);
    log(`[updateCreditCardUseCaseAdapter]: credit card data was updated [id]: ${updatedCreditCard.id}`);
    const hateoas = { ...updatedCreditCard, path: `/credit-cards/${updatedCreditCard.id}` };
    res.status(200).json(hateoas);
  } catch (error) {
    log(`[updateCreditCardUseCaseAdapter]: an error occured while saving the credit card [${error}]`);
    res.status(422).json({ error });
  }
};

export default updateCreditCardUsecaseAdapter;
