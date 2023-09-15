import { log } from './core/logger/logger';
import server from './server';

const port = process.env.PORT || 3333;
server.listen(port, () => {
  log(`[server]: HTTP server running at port ${port}`);
});
