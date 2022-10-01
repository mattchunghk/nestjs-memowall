// import { Module } from '@nestjs/common';
// import { KnexModule } from 'nest-knexjs/dist/knex.module';

// import { ConfigModule } from '@nestjs/config';
// import { UsersController } from 'src/controller/users.controller';
// import { UsersService } from 'src/service/users.service';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     KnexModule.forRoot({
//       config: {
//         client: 'pg',
//         version: '8.8.0',
//         connection: {
//           host: 'localhost',
//           user: process.env.DB_USERNAME,
//           password: process.env.DB_PASSWORD,
//           database: process.env.DB_NAME,
//         },
//       },
//     }),
//   ],
//   controllers: [UsersController],
//   providers: [UsersService],
// })
// export class UsersModule {}
