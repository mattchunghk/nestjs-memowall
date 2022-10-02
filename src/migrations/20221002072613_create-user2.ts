import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('users_test');
  if (!hasTable) {
    await knex.schema.createTable('users_test', (table) => {
      table.increments();
      table.string('username');
      table.string('password');
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users_test');
}
