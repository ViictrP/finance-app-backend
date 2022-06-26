import express from 'express';
import createUserUseCaseAdapter from './adapters/createUserUseCaseAdapter';
import authenticationUseCaseAdapter from './adapters/authenticationUseCaseAdapter';
import getMyProfileUseCaseAdapter from './adapters/getMyProfileUseCaseAdapter';

const router = express.Router();

router.post('/users', createUserUseCaseAdapter);
router.post('/login', authenticationUseCaseAdapter);
router.get('/me', getMyProfileUseCaseAdapter);

export default router;
