import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  let hasTable = await knex.schema.hasTable('users');
  if (!hasTable) {
    await knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('username');
      table.string('password');
      table.timestamps(false, true);
    });
  }
  hasTable = await knex.schema.hasTable('memos');
  if (!hasTable) {
    await knex.schema.createTable('memos', (table) => {
      table.increments();
      table.string('content');
      table.string('image');
      table.timestamps(false, true);
    });
  }
  hasTable = await knex.schema.hasTable('likes');
  if (!hasTable) {
    await knex.schema.createTable('likes', (table) => {
      table.increments();
      table.integer('user_id');
      table.integer('memo_id');
      table.foreign('user_id').references('users.id');
      table.foreign('memo_id').references('memos.id');
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('likes');
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('memos');
}
