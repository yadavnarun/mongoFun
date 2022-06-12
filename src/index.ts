import express from 'express';
import config from 'config';
import { connectToDb, log } from './utils';
import router from './routes';

const app = express();

app.use(express.json());
app.use(router);

const port = config.get<number>('port');

app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);
  connectToDb();
});
