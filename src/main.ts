import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as fs from 'fs';
import { join } from 'path';

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
  const PORT = 3000;

  app.use(
    session({
      secret: 'my-secret',
      resave: true,
      saveUninitialized: true,
    }),
  );
  await app.listen(PORT);
  console.log(`Listening at http://localhost:${PORT}/`);
}
bootstrap();

export async function deletedImg(filename: string) {
  fs.unlink(
    `${join(__dirname, '..', '..', 'public', 'uploads', filename)}`,
    (err) => {
      if (err) console.log('delete img error');
    },
  );
}
