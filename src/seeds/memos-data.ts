import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('likes').del();
  await knex('memos').del();
  // Inserts seed entries
  await knex('memos').insert([
    { id: 1, content: 'seed-1', image: 'None' },
    { id: 2, content: 'seed-2', image: 'memoFile-1662474675541-1.jpeg' },
    { id: 3, content: 'seed-3', image: 'None' },
    { id: 4, content: 'seed-4', image: 'None' },
  ]);
}
