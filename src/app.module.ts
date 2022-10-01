import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { KnexModule } from 'nest-knexjs/dist/knex.module';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { UsersService } from './users/users.service';
import { MemosController } from './memos/memos.controller';
import { MemosService } from './memos/memos.service';
import { UsersController } from './users/users.controller';
console.log(join(__dirname, '...', 'public'));
@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join('/Users/mattchung/Documents/VSC/memo-wall/', 'public'),
    }),
    KnexModule.forRoot({
      config: {
        client: 'pg',
        version: '8.8.0',
        connection: {
          host: 'localhost',
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        },
      },
    }),
  ],
  controllers: [AppController, UsersController, MemosController],
  providers: [AppService, UsersService, MemosService],
})
export class AppModule {}
