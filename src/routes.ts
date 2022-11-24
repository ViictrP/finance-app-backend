import express from 'express';
import {
  authenticationUseCaseAdapter, backupAdapter,
  getBalanceUseCaseAdapter,
  getCreditCardsUseCaseAdapter,
  getInvoiceUseCaseAdapter,
  getMyProfileUseCaseAdapter,
  postCreditCardUseCaseAdapter,
  postTransactionUseCaseAdapter,
  postUserUseCaseAdapter,
  updateCreditCardUseCaseAdapter,
  updateUserUseCaseAdapter,
  deleteTransactionUseCaseAdapter
} from './adapters';
import { isAdminMiddleware, isAuthorizedMiddleware } from './adapters/middlewares';

const router = express.Router();

// ============= BACKUP ============
router.get('/admin/backup', isAdminMiddleware, backupAdapter);

// ============= USER ==============
router.post('/users', postUserUseCaseAdapter);
router.post('/login', authenticationUseCaseAdapter);
router.put('/users', isAuthorizedMiddleware, updateUserUseCaseAdapter);
router.get('/me', isAuthorizedMiddleware, getMyProfileUseCaseAdapter);
router.get('/balances', isAuthorizedMiddleware, getBalanceUseCaseAdapter);


// ============= CREDIT CARD ============
router.post('/credit-cards', isAuthorizedMiddleware, postCreditCardUseCaseAdapter);
router.get('/credit-cards', isAuthorizedMiddleware, getCreditCardsUseCaseAdapter);
router.get('/credit-cards/:id/invoices', isAuthorizedMiddleware, getInvoiceUseCaseAdapter);
router.put('/credit-cards/:id', isAuthorizedMiddleware, updateCreditCardUseCaseAdapter);

// ============= TRANSACTION ============
router.post('/transactions', isAuthorizedMiddleware, postTransactionUseCaseAdapter);
router.delete('/transactions/:id', isAuthorizedMiddleware, deleteTransactionUseCaseAdapter);
export default router;
