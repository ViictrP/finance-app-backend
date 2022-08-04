import express from 'express';
import {
  authenticationUseCaseAdapter,
  getCreditCardsUseCaseAdapter,
  getInvoiceUseCaseAdapter,
  getMyProfileUseCaseAdapter,
  postCreditCardUseCaseAdapter,
  postTransactionUseCaseAdapter,
  postUserUseCaseAdapter,
  deleteUserDataUseCaseAdapter,
  updateCreditCardUseCaseAdapter,
  updateUserUseCaseAdapter
} from './adapters';
import deleteTransactionUseCaseAdapter from './adapters/deleteTransactionUseCaseAdapter';
import { isAuthorizedMiddleware } from './adapters/middlewares';

const router = express.Router();

// ============= USER ==============

router.post('/users', postUserUseCaseAdapter);
router.post('/login', authenticationUseCaseAdapter);
router.put('/users', isAuthorizedMiddleware, updateUserUseCaseAdapter);
router.get('/me', isAuthorizedMiddleware, getMyProfileUseCaseAdapter);
router.delete('/users', isAuthorizedMiddleware, deleteUserDataUseCaseAdapter);


// ============= CREDIT CARD ============
router.post('/credit-cards', isAuthorizedMiddleware, postCreditCardUseCaseAdapter);
router.get('/credit-cards', isAuthorizedMiddleware, getCreditCardsUseCaseAdapter);
router.get('/credit-cards/:id/invoices', isAuthorizedMiddleware, getInvoiceUseCaseAdapter);
router.put('/credit-cards/:id', isAuthorizedMiddleware, updateCreditCardUseCaseAdapter);

// ============= TRANSACTION ============
router.post('/transactions', isAuthorizedMiddleware, postTransactionUseCaseAdapter);
router.delete('/transactions/:id', isAuthorizedMiddleware, deleteTransactionUseCaseAdapter);
export default router;
