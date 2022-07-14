import express from 'express';
import {
  authenticationUseCaseAdapter,
  createCreditCardUseCaseAdapter, createTransactionUseCaseAdapter,
  createUserUseCaseAdapter,
  getCreditCardsUseCaseAdapter,
  getMyProfileUseCaseAdapter,
  updateUserUseCaseAdapter,
} from './adapters';

const router = express.Router();

// ============= USER ==============

router.post('/users', createUserUseCaseAdapter);
router.post('/login', authenticationUseCaseAdapter);
router.put('/users/:id', updateUserUseCaseAdapter);
router.get('/me', getMyProfileUseCaseAdapter);


// ============= CREDIT CARD ============
router.post('/credit-cards', createCreditCardUseCaseAdapter);
router.get('/credit-cards', getCreditCardsUseCaseAdapter);

// ============= TRANSACTION ============
router.post('/transactions', createTransactionUseCaseAdapter);
export default router;
