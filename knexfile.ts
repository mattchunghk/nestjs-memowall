import { ConfigModule } from '@nestjs/config';
import type { Knex } from 'knex';
// import dotenv from 'dotenv';

// Update with your config settings.
ConfigModule.forRoot();
export const config: { [key: string]: Knex.Config } = {
  development: {
    debug: true,
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
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
    seeds: {
      directory: 'src/seeds',
      // tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/migrations',
    },
  },
};

module.exports = config;
