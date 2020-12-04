import { Db } from 'mongodb';
import { TweetEntity } from '../src/entity/tweet';
import { User } from '../src/entity/user';

module.exports = {
  async up(db: Db): Promise<void> {
    await db.createCollection('user', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'Twitter user\'s handle name is required',
            },
          },
        },
      },
    });

    await db.collection<User>('user').createIndex({ name: 1 }, { unique: true });

    await db.createCollection('tweet', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['tweetId', 'author', 'fetchedAt', 'hasRetweeted'],
          properties: {
            tweetId: {
              bsonType: 'string',
              description: 'Tweet ID is required',
            },
            author: {
              bsonType: 'string',
              description: 'Tweet author handle is required',
            },
            fetchedAt: {
              bsonType: 'date',
              description: 'Tweet fetch time is required',
            },
            hasRetweeted: {
              bsonType: 'bool',
              description: 'A boolean that indicates if the current tweet has been retweeted is required',
            },
            approvedAt: {
              bsonType: 'date',
              description: 'Tweet approval time is required',
            },
          },
        },
      },
    });

    await db.collection<TweetEntity>('tweet').createIndex({ tweetId: 1 }, { unique: true });
  },

  async down(db: Db): Promise<void> {
    await db.collection<TweetEntity>('tweet').dropIndexes();
    await db.collection<User>('user').dropIndexes();

    await db.dropCollection('tweet');
    await db.dropCollection('user');
  },
};
