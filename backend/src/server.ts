import 'reflect-metadata';
import { app } from './app';
import { env } from './config/env';
import { AppDataSource } from './db/data-source';

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("==================");
    console.log('Database connected');

    app.listen(env.PORT, () => {
      console.log("==================");
      console.log(`Server listening on:  http://localhost:${env.PORT}`);
      console.log(`Swagger UI         :  http://localhost:${env.PORT}/docs`);
      console.log("==================");
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
