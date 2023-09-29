import express, { NextFunction, Request, Response } from 'express';
import {
  authenticationUsecaseAdapter,
  backupAdapter,
  deleteCreditCardUsecaseAdapter,
  deleteRecurringExpenseUsecaseAdapter,
  deleteTransactionUsecaseAdapter,
  getBalanceUsecaseAdapter,
  getCreditCardsUsecaseAdapter,
  getInvoiceUsecaseAdapter,
  getMyProfileUsecaseAdapter,
  postCreditCardUsecaseAdapter,
  postMonthClosureUsecaseAdapter,
  postRecurringExpensesUsecaseAdapter,
  postTransactionUsecaseAdapter,
  postUserUsecaseAdapter,
  updateCreditCardUsecaseAdapter,
  updateUserUsecaseAdapter
} from './adapters';
import { isAdminMiddleware } from './adapters/middlewares';

const router = express.Router();

type Adapter<T> = (req: Request, res: Response) => Promise<T>;

async function commonRouter<T>(
  req: Request,
  res: Response,
  next: NextFunction,
  adapter: Adapter<T>
) {
  try {
    await adapter(req, res);
  } catch (err) {
    next(err);
  }
}

// ============= BACKUP ============
const backupRoute = (req: Request, res: Response, next: NextFunction) =>
  commonRouter(req, res, next, backupAdapter);
router.get('/admin/backup', isAdminMiddleware, backupRoute);

// ============= USER ==============
const postUserRoute = (req: Request, res: Response, next: NextFunction) =>
  commonRouter(req, res, next, postUserUsecaseAdapter);
const authenticationRoute = (req: Request, res: Response, next: NextFunction) =>
  commonRouter(req, res, next, authenticationUsecaseAdapter);
const updateUserRoute = (req: Request, res: Response, next: NextFunction) =>
  commonRouter(req, res, next, updateUserUsecaseAdapter);
const getMyProfileRoute = (req: Request, res: Response, next: NextFunction) =>
  commonRouter(req, res, next, getMyProfileUsecaseAdapter);
const getBalanceRoute = (req: Request, res: Response, next: NextFunction) =>
  commonRouter(req, res, next, getBalanceUsecaseAdapter);

router.post('/users', postUserRoute);
router.post('/login', authenticationRoute);
router.put('/users', updateUserRoute);
router.get('/me', getMyProfileRoute);
router.get('/balances', getBalanceRoute);

// ============= CREDIT CARD ============
const postCreditCardRoute = (req: Request, res: Response, next: NextFunction) =>
  commonRouter(req, res, next, postCreditCardUsecaseAdapter);
const getCreditCardsRoute = (req: Request, res: Response, next: NextFunction) =>
  commonRouter(req, res, next, getCreditCardsUsecaseAdapter);
const getCreditCardInvoicesRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => commonRouter(req, res, next, getInvoiceUsecaseAdapter);
const updateCreditCardRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => commonRouter(req, res, next, updateCreditCardUsecaseAdapter);
const deleteCreditCardRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => commonRouter(req, res, next, deleteCreditCardUsecaseAdapter);

router.post('/credit-cards', postCreditCardRoute);
router.get('/credit-cards', getCreditCardsRoute);
router.get('/credit-cards/:id/invoices', getCreditCardInvoicesRoute);
router.put('/credit-cards/:id', updateCreditCardRoute);
router.delete('/credit-cards/:id', deleteCreditCardRoute);

// ============= TRANSACTION ============
const postTransactionRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => commonRouter(req, res, next, postTransactionUsecaseAdapter);
const deleteTransactionRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => commonRouter(req, res, next, deleteTransactionUsecaseAdapter);
const postRecurringExpensesRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => commonRouter(req, res, next, postRecurringExpensesUsecaseAdapter);
const deleteRecurringExpenseRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => commonRouter(req, res, next, deleteRecurringExpenseUsecaseAdapter);

router.post('/transactions', postTransactionRoute);
router.delete('/transactions/:id', deleteTransactionRoute);
router.post('/recurring-expenses', postRecurringExpensesRoute);
router.delete('/recurring-expenses/:id', deleteRecurringExpenseRoute);

// ============= MONTH CLOSURE ===========
const postMonthclosureRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => commonRouter(req, res, next, postMonthClosureUsecaseAdapter);
router.post('/month-closures', postMonthclosureRoute);

export default router;
