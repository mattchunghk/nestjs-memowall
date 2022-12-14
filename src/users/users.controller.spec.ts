import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

import Knex from 'knex';
import { UsersService } from 'src/users/users.service';
import { hashPassword } from '../../utils/hash';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexfile = require('../knexfile'); /// Assuming you test case is inside `services/ folder`
const knex = Knex(knexfile['test']); // Now the connection is a testing connection.
const test_users = 'matt';

describe('UsersController', async () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = new UsersService(knex);
    await knex('users').del();
    const hashedPassword = await hashPassword(test_users);
    await knex
      .insert({
        username: test_users,
        password: hashedPassword,
      })
      .into('users');
  });

  it('check login ', async () => {
    const users = await usersService.login(test_users);
    expect(users.length).toBe(1);
  });
});
