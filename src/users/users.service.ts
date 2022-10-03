import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { hashPassword } from 'utils/hash';

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

  async register(username: string, password: string) {
    const hashedPassword = await hashPassword(password.toString());
    await this.knex('users').insert({
      username: username,
      password: hashedPassword,
    });
    return 'users insert successfully';
  }
}
