import { Context } from '../common/types';
import { Tweet } from '../entity/tweet';

export async function retweet(
  tweets: Tweet[],
  { tweetRepository, twitterRepository }: Context,
): Promise<void> {
  const retweetRequest = await Promise.allSettled(
    tweets.map(
      tweet => twitterRepository.retweet(tweet.tweetId),
    ),
  );

  const successIds: string[] = [];

  retweetRequest.forEach((result, index) => {
    if (result.status) {
      successIds.push(tweets[index].tweetId);
    }
  });

  await Promise.all(
    successIds.map(id => tweetRepository.markRetweet(id)),
  );
}
