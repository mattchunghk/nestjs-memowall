import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('hello');
  if (!hasTable) {
    await knex.schema.createTable('hello', (table) => {
      table.increments();
      table.string('username');
      table.string('password');
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('hello');
}
