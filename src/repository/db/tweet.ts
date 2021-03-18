import { Db } from 'mongodb';
import { Tweet, TweetEntity } from '../../entity/tweet';
import { MongoRepository } from './mongo';

/**
 * Repository for handling anything related with tweet objects
 * which is stored on our database. Exclusively implemented
 * for MongoDB.
 */
export class TweetRepository extends MongoRepository<TweetEntity> {
  public constructor(db: Db) {
    super('tweet', db);
  }

  /**
   * Get all tweets that has been approved but has not retweeted yet
   *
   * @returns {Promise<Tweet[]>} List of approved tweets
   */
  public getApprovedTweets = async (limit?: number): Promise<Tweet[]> => {
    const result = await this.collection
      .find(
        {
          approvedAt: { $exists: true },
          retweetedAt: undefined,
          failedAt: undefined,
        },
      )
      .project({ tweetId: 1 })
      .sort({ approvedAt: 1 })
      .limit(limit && limit > 0 ? limit : 0)
      .toArray();

    return result.map(doc => Tweet.fromJSON(doc));
  }

  /**
   * Insert fresh and relevant tweets into the database.
   *
   * This method has best-effort principles, which means
   * that it will insert all tweets that doesn't violate
   * duplicate constraint and ignore tweets that violates it.
   *
   * @param {Tweet[]} tweets Fresh and relevant tweets to
   * be inserted into the database
   * @returns {Promise<Tweet[]>} All successfully inserted tweets
   */
  public insertFreshTweets = async (tweets: Tweet[]): Promise<Tweet[]> => {
    const entities = tweets.map(tweet => tweet.toJSON());

    try {
      await this.collection
        .insertMany(entities, { ordered: false });

      return tweets;
    } catch (err) {
      const rejectedTweets: string[] = err.writeErrors.map(
        (error: any) => error.err.op.tweetId, // get all duplicate tweetId
      );

      return tweets.filter(tweet => !rejectedTweets.includes(tweet.tweetId)); // get all tweets that successfully inserted
    }
  }

  /**
   * Approve a tweet to be retweeted by official account
   *
   * @param {string} tweetId Tweet ID
   * @param {Date} approvalDate Date when this tweet has been approved
   * @returns {Promise<boolean>} A boolean which indicates if approval is commited successfully
   */
  public approveTweet = async (
    tweetId: string,
    approvalDate: Date,
  ): Promise<boolean> => {
    const result = await this.collection
      .updateOne(
        { tweetId },
        { $set: { approvedAt: approvalDate } },
      );

    return result.result.ok === 1;
  }

  /**
   * Reject a tweet (a.k.a deletes it from the database)
   *
   * @param {string} tweetId Tweet's ID
   * @returns {Promise<boolean>} A boolean which indicates if rejection is commited successfully
   */
  public rejectTweet = async (tweetId: string): Promise<boolean> => {
    const result = await this.collection
      .deleteOne({ tweetId });

    return result.result.ok === 1;
  }

  /**
   * Repost a tweet via official account, marking it in the database
   *
   * @param {string} tweetId Tweet's ID
   * @returns {Promise<boolean>} A boolean which indicates if repost is commited successfully
   */
  public markRetweet = async (tweetId: string): Promise<boolean> => {
    const result = await this.collection
      .updateOne(
        { tweetId },
        { $set: { hasRetweeted: true, retweetedAt: (new Date()) } },
      );

    return result.result.ok === 1;
  }

  public markFailed = async (tweetId: string): Promise<boolean> => {
    const result = await this.collection
      .updateOne(
        { tweetId },
        { $set: { failedAt: (new Date()) } },
      );

    return result.result.ok === 1;
  }

  /**
   * Deletes all tweets that has been retweeted.
   * Useful if the database is quota-limited.
   *
   * @returns {Promise<boolean>} A boolean which indicates if bulk deletion is performed
   * successfully.
   */
  public clearHistory = async (): Promise<boolean> => {
    const result = await this.collection
      .deleteMany(
        {
          approvedAt: { $exists: true },
          hasRetweeted: true,
        },
      );

    return result.result.ok === 1;
  }
}
