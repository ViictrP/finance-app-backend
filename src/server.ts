import express from 'express';
import cors from 'cors';
import routes from './routes';
import { log } from './core/logger/logger';
import { errorHandler } from './adapters/handlers';
import helmet from 'helmet';
import morgan from 'morgan';
import {
  oAuth0CheckAuthentication,
  oAuth0CheckAuthorization
} from './adapters/middlewares';

require('dotenv').config();

log('[server]: Creating the server');
const server = express();

log('[server]: Configuring the server');
server.use(morgan('dev'));
server.use(helmet());
server.use(oAuth0CheckAuthentication);
server.use(oAuth0CheckAuthorization);

server.use(cors());
server.use(express.json());

log('[server]: Loading the routes');
server.use(routes);

// ============= ERROR HANDLING ===========
server.use(errorHandler);

export default server;
