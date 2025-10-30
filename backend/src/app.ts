import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { setupSwagger } from './config/swagger';
import { errorMiddleware } from './common/middlewares/error.middleware';
import { healthRouter } from './modules/health/health.routes';
import { authRouter } from './modules/auth/auth.routes';

export const app = express();

app.use(helmet());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);

setupSwagger(app);

app.use('/api', (_req, res) => res.status(404).json({ error: { message: 'Not Found' } }));
app.use(errorMiddleware);
