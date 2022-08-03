import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { userPrismaRepository, creditCardPrismaRepository } from '../infra';
import { createCreditCardUseCase } from '../core/usecases';
import jwt from 'jsonwebtoken';

const postCreditCardUseCaseAdapter = async (req: Request, res: Response) => {
  try {
    const { body, headers } = req;
    const { user } = res.locals;
    body.user = user;
    log('[postCreditCardUseCaseAdapter]: save credit card request received with body {}', body);
    const newCreditCard = await createCreditCardUseCase(body, userPrismaRepository as any, creditCardPrismaRepository as any);
    log(`[createCreditCardUseCaseAdapter]: new credit card [id]: ${newCreditCard.id} saved`);
    const hateoas = { ...newCreditCard, path: `/credit-cards/${newCreditCard.id}` };
    res.status(201).json(hateoas);
  } catch (error) {
    log(`[createCreditCardUseCaseAdapter]: an error occured while saving the new credit card [${error}]`);
    res.status(422).json({ error });
  }
};

export default postCreditCardUseCaseAdapter;
