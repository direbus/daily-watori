import { Db } from 'mongodb';
import { Tweet, TweetEntity } from '../entity/tweet';
import { MongoRepository } from './mongo';
export class TweetRepository extends MongoRepository<TweetEntity> {
  public constructor(db: Db) {
    super('tweet', db);
  }

  public getApprovedTweets = async (): Promise<Tweet[]> => {
    const result = await this.collection
      .find(
        {
          approvedAt: { $exists: true },
          hasRetweeted: false,
        },
      )
      .project({ tweetId: 1, author: 1 })
      .toArray();

    return result.map(doc => Tweet.fromJSON(doc));
  }

  public insertFreshTweets = async (tweets: Tweet[]): Promise<boolean> => {
    const entities = tweets.map(tweet => tweet.toJSON());

    const result = await this.collection
      .insertMany(entities, { ordered: false });

    return result.result.ok === 1;
  }

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

  public rejectTweet = async (tweetId: string): Promise<boolean> => {
    const result = await this.collection
      .deleteOne({ tweetId });

    return result.result.ok === 1;
  }

  public repostTweet = async (tweetId: string): Promise<boolean> => {
    const result = await this.collection
      .updateOne(
        { tweetId },
        { hasRetweeted: true },
      );

    return result.result.ok === 1;
  }
}
