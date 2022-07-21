import express from 'express';
import {
  authenticationUseCaseAdapter,
  postCreditCardUseCaseAdapter, postTransactionUseCaseAdapter,
  postUserUseCaseAdapter,
  getCreditCardsUseCaseAdapter,
  getMyProfileUseCaseAdapter,
  updateUserUseCaseAdapter,
} from './adapters';

const router = express.Router();

// ============= USER ==============

router.post('/users', postUserUseCaseAdapter);
router.post('/login', authenticationUseCaseAdapter);
router.put('/users/:id', updateUserUseCaseAdapter);
router.get('/me', getMyProfileUseCaseAdapter);


// ============= CREDIT CARD ============
router.post('/credit-cards', postCreditCardUseCaseAdapter);
router.get('/credit-cards', getCreditCardsUseCaseAdapter);

// ============= TRANSACTION ============
router.post('/transactions', postTransactionUseCaseAdapter);
export default router;
