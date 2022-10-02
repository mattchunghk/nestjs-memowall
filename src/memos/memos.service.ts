import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

import { deletedImg } from 'src/main';

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

  async likeMemos(memoId: number, userId: number) {
    const likesUser: any = await this.knex('likes')
      .count('*')
      .where({ memo_id: memoId, user_id: userId });

    if (parseInt(likesUser[0].count) == 0) {
      await this.knex('likes').insert({ memo_id: memoId, user_id: userId });
    } else {
      await this.knex('likes')
        .where({ memo_id: memoId, user_id: userId })
        .del();
    }

    const likeNum: any = await this.knex('likes')
      .count('*')
      .where({ memo_id: memoId });

    await this.knex('memos')
      .where({ id: memoId })
      .update({ likes_num: likeNum[0].count });

    return `memo#${memoId} like successfully`;
  }

  async updateMemos(memoId: number, updateContent: string) {
    await this.knex('memos')
      .where({ id: memoId })
      .update({ content: updateContent });
    return `memo#${memoId} update successfully`;
  }

  async deleteMemos(memoId: number) {
    const img = await this.knex
      .select('image')
      .from('memos')
      .where({ id: memoId });
    if (img[0].image != 'None') {
      deletedImg(img[0].image);
    }

    await this.knex('likes').where({ memo_id: memoId }).del();
    await this.knex('memos').where({ id: memoId }).del();
    return `memo#${memoId} delete successfully`;
  }
}
