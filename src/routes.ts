import express from 'express';
import {
  authenticationUseCaseAdapter,
  createUserUseCaseAdapter,
  getMyProfileUseCaseAdapter,
  updateUserUseCaseAdapter,
} from './adapters';

const router = express.Router();

router.post('/users', createUserUseCaseAdapter);
router.post('/login', authenticationUseCaseAdapter);
router.put('/users/:id', updateUserUseCaseAdapter);
router.get('/me', getMyProfileUseCaseAdapter);

export default router;
