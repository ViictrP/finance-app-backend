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
  updateUserUsecaseAdapter,
} from './adapters';
import { isAdminMiddleware, isAuthorizedMiddleware } from './adapters/middlewares';

const router = express.Router();

type Adapter<T> = (req: Request, res: Response) => Promise<T>;

async function commonRouter<T>(req: Request, res: Response, next: NextFunction, adapter: Adapter<T>) {
  try {
    await adapter(req, res);
  } catch (err) {
    next(err);
  }
}

// ============= BACKUP ============
const backupRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, backupAdapter);
router.get('/admin/backup', isAdminMiddleware, backupRoute);

// ============= USER ==============
const postUserRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, postUserUsecaseAdapter);
const authenticationRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, authenticationUsecaseAdapter);
const updateUserRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, updateUserUsecaseAdapter);
const getMyProfileRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, getMyProfileUsecaseAdapter);
const getBalanceRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, getBalanceUsecaseAdapter);

router.post('/users', postUserRoute);
router.post('/login', authenticationRoute);
router.put('/users', isAuthorizedMiddleware, updateUserRoute);
router.get('/me', isAuthorizedMiddleware, getMyProfileRoute);
router.get('/balances', isAuthorizedMiddleware, getBalanceRoute);


// ============= CREDIT CARD ============
const postCreditCardRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, postCreditCardUsecaseAdapter);
const getCreditCardsRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, getCreditCardsUsecaseAdapter);
const getCreditCardInvoicesRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, getInvoiceUsecaseAdapter);
const updateCreditCardRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, updateCreditCardUsecaseAdapter);
const deleteCreditCardRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, deleteCreditCardUsecaseAdapter);

router.post('/credit-cards', isAuthorizedMiddleware, postCreditCardRoute);
router.get('/credit-cards', isAuthorizedMiddleware, getCreditCardsRoute);
router.get('/credit-cards/:id/invoices', isAuthorizedMiddleware, getCreditCardInvoicesRoute);
router.put('/credit-cards/:id', isAuthorizedMiddleware, updateCreditCardRoute);
router.delete('/credit-cards/:id', isAuthorizedMiddleware, deleteCreditCardRoute);

// ============= TRANSACTION ============
const postTransactionRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, postTransactionUsecaseAdapter);
const deleteTransactionRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, deleteTransactionUsecaseAdapter);
const postRecurringExpensesRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, postRecurringExpensesUsecaseAdapter);
const deleteRecurringExpenseRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, deleteRecurringExpenseUsecaseAdapter);

router.post('/transactions', isAuthorizedMiddleware, postTransactionRoute);
router.delete('/transactions/:id', isAuthorizedMiddleware, deleteTransactionRoute);
router.post('/recurring-expenses', isAuthorizedMiddleware, postRecurringExpensesRoute);
router.delete('/recurring-expenses/:id', isAuthorizedMiddleware, deleteRecurringExpenseRoute);

// ============= MONTH CLOSURE ===========
const postMonthclosureRoute = (req: Request, res: Response, next: NextFunction) => commonRouter(req, res, next, postMonthClosureUsecaseAdapter);
router.post('/month-closures', isAuthorizedMiddleware, postMonthclosureRoute);

export default router;
