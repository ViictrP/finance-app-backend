import express from 'express';
import cors from 'cors';
import routes from './routes';
import { log } from './core/logger/logger';
import { errorHandler } from './adapters/handlers';
import helmet from 'helmet';
import morgan from 'morgan';

require('dotenv').config();

log('[server]: Creating the server');
const server = express();

log('[server]: Configuring the server');
server.use(morgan('dev'));
server.use(helmet());
server.use(cors({
  origin: process.env.FRONT_HOST,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
}));
server.use(express.json());

log('[server]: Loading the routes');
server.use(routes);

// ============= ERROR HANDLING ===========
server.use(errorHandler);

export default server;
