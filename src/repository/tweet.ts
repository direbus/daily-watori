import { EntityManager, EntityRepository } from 'typeorm';
import { Tweet } from '../entity/tweet';

@EntityRepository()
export class TweetRepository {
  public constructor(private readonly manager: EntityManager) {}

  public getApprovedTweets = async (): Promise<Tweet[]> => {
    return this.manager.connection
      .createQueryBuilder()
      .select('tweetId')
      .from(Tweet, 'tweet')
      .where('approvedAt IS NOT NULL')
      .andWhere('hasRetweeted = 0')
      .getMany();
  }

  public insertFreshTweets = async (tweets: Tweet[]): Promise<void> => {
    await this.manager.connection
      .createQueryBuilder()
      .insert()
      .into(Tweet)
      .values(tweets)
      .onConflict('(tweetId) DO NOTHING')
      .execute();
  }

  public approveTweet = async (tweetId: string, approvalDate: Date): Promise<boolean> => {
    const result = await this.manager.connection
      .createQueryBuilder()
      .update(Tweet)
      .set({ approvedAt: approvalDate })
      .where('tweetId = :id', { id: tweetId })
      .callListeners(false)
      .execute();

    return result.affected === 1;
  }

  public rejectTweet = async (tweetId: string): Promise<boolean> => {
    const result = await this.manager.connection
      .createQueryBuilder()
      .delete()
      .from(Tweet)
      .where('tweetId = :id', { id: tweetId })
      .callListeners(false)
      .execute();

    return result.affected === 1;
  }

  public repostTweet = async (tweetId: string): Promise<boolean> => {
    const result = await this.manager.connection
      .createQueryBuilder()
      .update(Tweet)
      .set({ hasRetweeted: true })
      .where('tweetId = :id', { id: tweetId })
      .callListeners(false)
      .execute();

    return result.affected === 1;
  }
}
