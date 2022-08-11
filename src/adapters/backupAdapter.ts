import { Request, Response } from 'express';
import { log } from '../core/logger/logger';
import { prisma } from '../infra/prisma';

const backupAdapter = async (req: Request, res: Response) => {
  try {
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
        transactions: true,
      },
    });
    log('[backupAdapter]: backup generated!');
    res.status(200).json({ backup });
  } catch (error) {
    log('[backupAdapter]: an error occured while doing the backup');
    res.status(422).json({ error });
  }
};

export default backupAdapter;
