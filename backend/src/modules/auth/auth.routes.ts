import { Router } from 'express';
import cookieParser from 'cookie-parser';
import { validate } from '../../common/middlewares/validate.middleware';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthController } from './auth.controller';
import { authGuard } from '../../common/middlewares/auth.guard';
import { loginLimiter, registerLimiter } from '../../config/rate-limit';

export const authRouter = Router();

// Có thể chuyển cookieParser lên app.ts, tạm để đây cũng được
authRouter.use(cookieParser());

const controller = new AuthController();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:    { type: string, format: email }
 *               password: { type: string, minLength: 8 }
 *               name:     { type: string, nullable: true }
 *             required: [email, password]
 *     responses:
 *       201:
 *         description: Created
 */
authRouter.post('/register', registerLimiter, validate(RegisterDto), controller.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:    { type: string, format: email }
 *               password: { type: string, minLength: 8 }
 *             required: [email, password]
 *     responses:
 *       200:
 *         description: OK
 */
authRouter.post('/login', loginLimiter, validate(LoginDto), controller.login);

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Refresh access token (via httpOnly cookie)
 *     responses:
 *       200:
 *         description: OK
 */
authRouter.post('/refresh', controller.refresh);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Logout & revoke refresh tokens
 *     responses:
 *       204:
 *         description: No Content
 */
authRouter.post('/logout', authGuard, controller.logout);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Current user
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: OK
 */
authRouter.get('/me', authGuard, controller.me);
