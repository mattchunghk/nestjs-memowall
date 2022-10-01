import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    counter?: number;
    name?: string;
    isLoggedIn?: boolean;
    useId?: any;
    grant?: any;
    user: any;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'my-secret',
      resave: true,
      saveUninitialized: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
