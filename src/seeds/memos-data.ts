import { Knex } from 'knex';
import { hashPassword } from '../../utils/hash';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('likes').del();
  await knex('memos').del();
  await knex('users').del();
  // Inserts seed entries
  const memoIds = await knex('memos')
    .insert([
      { id: 1, content: 'seed-1', image: 'None' },
      { id: 2, content: 'seed-2', image: 'memoFile-1662474675541-1.jpeg' },
      { id: 3, content: 'seed-3', image: 'None' },
      { id: 4, content: 'seed-4', image: 'None' },
      { id: 5, content: 'seed-5', image: 'None' },
      { id: 6, content: 'seed-6', image: 'None' },
    ])
    .returning('id');

  const users = ['matt', 'admin', 'tecky'];

  for (const i in users) {
    const hashedPassword = await hashPassword(users[i]);
    await knex('users').insert({
      id: parseInt(i) + 1,
      username: users[i],
      password: hashedPassword,
    });

    // for (const i in memoIds) {
    //   for (const j in users) {
    //     const userId = await knex
    //       .select('*')
    //       .from('users')
    //       .where({ username: users[j] });
    //     console.log('abc' + userId[0].id);

    //     if (Math.random() > 0.5) {
    //       await knex('likes').insert([
    //         { user_id: userId[0].id, memo_id: memoIds[i] },
    //       ]);
    //     }
    //   }
    // }
  }
}
