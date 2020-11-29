import { EntityRepository, Repository } from 'typeorm';
import { Tweet } from '../entity/tweet';

@EntityRepository(Tweet)
export class TweetRepository extends Repository<Tweet> {
  public approveTweet = async (tweetId: string, approvalDate: Date): Promise<boolean> => {
    const result = await this.update({ tweetId }, { approvedAt: approvalDate });

    return result.affected === 1;
  }

  public urgentRepost = async (tweetId: string): Promise<boolean> => {
    const result = await this.update({ tweetId }, { urgent: true });

    return result.affected === 1;
  }

  public repostTweet = async (tweetId: string): Promise<boolean> => {
    const result = await this.update({ tweetId }, { hasRetweeted: true });

    return result.affected === 1;
  }
}
