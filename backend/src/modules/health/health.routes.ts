import { Router } from 'express';
export const healthRouter = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: ok
 */
healthRouter.get('/', (_req, res) => res.json({ status: 'ok' }));
