import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import notFound from './app/middleWares/notFound';
import globalErrorHandler from './app/middleWares/globalErrorHandler';
import router from './app/routes';
import cookieParser from 'cookie-parser';

// parser
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'server live',
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
