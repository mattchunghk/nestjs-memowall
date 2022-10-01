import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class UsersService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async login(username: string) {
    const users = await this.knex
      .select('*')
      .from('users')
      .where({ username: username });
    return users[0];
  }
}
