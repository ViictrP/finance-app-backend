import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { prisma } from '../infra/prisma';

const resetAdapter = async (req: Request, res: Response) => {
  log('[resetAdapter]: reset data request received');
  await prisma.transaction.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.creditCard.deleteMany();
  log('[resetAdapter]: data wiped');
  res.status(204).json({ message: 'data wiped' });
};

export default resetAdapter;
