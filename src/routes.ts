import express from 'express';
import {
  authenticationUseCaseAdapter,
  getCreditCardsUseCaseAdapter,
  getInvoiceUseCaseAdapter,
  getMyProfileUseCaseAdapter,
  postCreditCardUseCaseAdapter,
  postTransactionUseCaseAdapter,
  postUserUseCaseAdapter,
  resetAdapter,
  updateUserUseCaseAdapter,
} from './adapters';
import deleteTransactionUseCaseAdapter from './adapters/deleteTransactionUseCaseAdapter';

const router = express.Router();

// ============= ADMIN ==============
router.delete('/admin/reset-data', resetAdapter);

// ============= USER ==============

router.post('/users', postUserUseCaseAdapter);
router.post('/login', authenticationUseCaseAdapter);
router.put('/users/:id', updateUserUseCaseAdapter);
router.get('/me', getMyProfileUseCaseAdapter);


// ============= CREDIT CARD ============
router.post('/credit-cards', postCreditCardUseCaseAdapter);
router.get('/credit-cards', getCreditCardsUseCaseAdapter);
router.get('/credit-cards/:id/invoices', getInvoiceUseCaseAdapter);

// ============= TRANSACTION ============
router.post('/transactions', postTransactionUseCaseAdapter);
router.delete('/transactions/:id', deleteTransactionUseCaseAdapter);
export default router;
