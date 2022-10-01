import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class MemosService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async uploadMemos(text: string, filename: string) {
    await this.knex('memos').insert({ content: text, image: filename });
    return 'upload success';
  }
  async getMemos() {
    const memos = await this.knex
      .select('*')
      .from('memos')
      .orderBy('created_at', 'desc');
    return memos;
  }

  async updateMemos(memoId: number, updateContent: string) {
    await this.knex('memos')
      .where({ id: memoId })
      .update({ content: updateContent });
    return `memo#${memoId} update successfully`;
  }

  async deleteMemos(memoId: number) {
    await this.knex('memos').where({ id: memoId }).del();
    return `memo#${memoId} delete successfully`;
  }
}
