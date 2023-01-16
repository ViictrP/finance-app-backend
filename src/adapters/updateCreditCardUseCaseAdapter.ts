import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { updateCreditCardUseCase } from '../core/usecases';
import { creditCardPrismaRepository } from '../infra';

const updateCreditCardUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { body, params } = req;
    body.id = params.id;
    body.user = res.locals.user;
    log('[updateCreditCardUseCaseAdapter]: update credit card request received with body {}', body);
    const updatedCreditCard = await updateCreditCardUseCase(body, creditCardPrismaRepository as any);
    log(`[updateCreditCardUseCaseAdapter]: credit card data was updated [id]: ${updatedCreditCard.id}`);
    const hateoas = { ...updatedCreditCard, path: `/credit-cards/${updatedCreditCard.id}` };
    res.status(200).json(hateoas);
  } catch (error) {
    log(`[updateCreditCardUseCaseAdapter]: an error occured while saving the credit card [${error}]`);
    res.status(422).json({ error });
  }
};

export default updateCreditCardUseCaseAdapter;
