import express from 'express';
import {
  authenticationUsecaseAdapter, backupAdapter,
  getBalanceUsecaseAdapter,
  getCreditCardsUsecaseAdapter,
  getInvoiceUsecaseAdapter,
  getMyProfileUsecaseAdapter,
  postCreditCardUsecaseAdapter,
  postTransactionUsecaseAdapter,
  postUserUsecaseAdapter,
  updateCreditCardUsecaseAdapter,
  updateUserUsecaseAdapter,
  deleteTransactionUsecaseAdapter,
  postRecurringExpensesUsecaseAdapter,
  deleteCreditCardUsecaseAdapter,
  deleteRecurringExpenseUsecaseAdapter,
  postMonthClosureUsecaseAdapter,
} from './adapters';
import { isAdminMiddleware, isAuthorizedMiddleware } from './adapters/middlewares';

const router = express.Router();

// ============= BACKUP ============
router.get('/admin/backup', isAdminMiddleware, backupAdapter);

// ============= USER ==============
router.post('/users', postUserUsecaseAdapter);
router.post('/login', authenticationUsecaseAdapter);
router.put('/users', isAuthorizedMiddleware, updateUserUsecaseAdapter);
router.get('/me', isAuthorizedMiddleware, getMyProfileUsecaseAdapter);
router.get('/balances', isAuthorizedMiddleware, getBalanceUsecaseAdapter);


// ============= CREDIT CARD ============
router.post('/credit-cards', isAuthorizedMiddleware, postCreditCardUsecaseAdapter);
router.get('/credit-cards', isAuthorizedMiddleware, getCreditCardsUsecaseAdapter);
router.get('/credit-cards/:id/invoices', isAuthorizedMiddleware, getInvoiceUsecaseAdapter);
router.put('/credit-cards/:id', isAuthorizedMiddleware, updateCreditCardUsecaseAdapter);
router.delete('/credit-cards/:id', isAuthorizedMiddleware, deleteCreditCardUsecaseAdapter);

// ============= TRANSACTION ============
router.post('/transactions', isAuthorizedMiddleware, postTransactionUsecaseAdapter);
router.delete('/transactions/:id', isAuthorizedMiddleware, deleteTransactionUsecaseAdapter);
router.post('/recurring-expenses', isAuthorizedMiddleware, postRecurringExpensesUsecaseAdapter);
router.delete('/recurring-expenses/:id', isAuthorizedMiddleware, deleteRecurringExpenseUsecaseAdapter);

// ============= MONTH CLOSURE ===========
router.post('/month-closures', isAuthorizedMiddleware, postMonthClosureUsecaseAdapter);
export default router;
