import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { ORIGIN } from '../constants';
import errorMiddleware from '../middlewares/errorMiddleware';
import { branchRouter } from '../routes/branch.routes';
import { corporationRouter } from '../routes/corporation.routes';
import { workerRouter } from '../routes/worker.routes';

const expressConfig = () => {
  const app = express();

  app.use(cors({ origin: ORIGIN, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use('/api', corporationRouter);
  app.use('/api', branchRouter);
  app.use('/api', workerRouter);

  app.use((req, res) => {
    res.status(400).send({ message: 'Bad request!' });
  });

  app.use(errorMiddleware);

  return app;
};

export default expressConfig;
