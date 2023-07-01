import express from 'express';
import cors from 'cors';
import routes from './routes';
import { log } from './core/logger/logger';

log('[server]: Creating the server');
const app = express();

log('[server]: Configuring CORS');
app.use(cors({
  origin: process.env.FRONT_HOST,
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE']
}));

log('[server]: Configuring the server');
app.use(express.json());

log('[server]: Loading the routes');
app.use(routes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  log(`[server]: HTTP server running at port ${port}`);
});
