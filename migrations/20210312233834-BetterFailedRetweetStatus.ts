import { Db } from 'mongodb';
import { TweetEntity } from '../src/entity/tweet';

module.exports = {
  async up(db: Db): Promise<void> {
    await db.collection<TweetEntity>('tweet').updateMany({}, { $set: { failedAt: undefined, retweetedAt: undefined } });
    await db.collection<TweetEntity>('tweet').updateMany({ hasRetweeted: true }, { $set: { retweetedAt: (new Date()) } });
  },

  async down(db: Db): Promise<void> {
    await db.collection<TweetEntity>('tweet').updateMany({}, { $unset: { failedAt: 1, retweetedAt: 1 } });
  }
};
