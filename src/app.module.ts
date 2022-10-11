import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { isLoggedIn } from 'utils/isLoggedIn.middleware';
import { EventsGateway } from './events.gateway';
import { config } from 'knexfile';
import { UsersModule } from './users/users.module';
import { MemosModule } from './memos/memos.module';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
    // KnexModule.forRoot(knex),
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
        pool: {
          min: 2,
          max: 10,
        },
        migrations: {
          tableName: 'knex_migrations',
          directory: 'src/migrations',
          // tableName: 'knex_migrations',
        },
      },
    }),

    UsersModule,
    MemosModule,
  ],
  controllers: [AppController, UsersController, MemosController],
  providers: [AppService, UsersService, MemosService, EventsGateway],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(isLoggedIn).forRoutes('memo/memo-formidable');
    consumer.apply(isLoggedIn).forRoutes('memo/delete/id');
    consumer.apply(isLoggedIn).forRoutes('memo/update');
  }
}
