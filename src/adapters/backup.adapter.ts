import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { prisma } from '../infra/prisma';

const backupAdapter = async (req: Request, res: Response) => {
  log('[backupAdapter]: backup request received');
  const backup = await prisma.user.findMany({
    include: {
      creditCards: {
        include: {
          invoices: {
            include: {
              transactions: true,
            },
          },
        },
      },
      recurringExpenses: true,
      transactions: {
        where: {
          invoice: null
        }
      },
    },
  });
  log('[backupAdapter]: backup generated!');
  return res.status(200).json({ backup });
};

export default backupAdapter;
