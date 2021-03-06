import { Context, TWEET_INSERT } from '../common/types';
import { logger } from '../utils/logger';
import { freshnessThreshold } from './../../bot.config.json';

/**
 * Fetch fresh tweets, insert them to the database, and
 * fire the TWEET_INSERT event to be handled by next handler.
 */
export async function fetchFreshTweets(
  { userRepository, tweetRepository, twitterRepository, emitter }: Context,
): Promise<void> {
  logger.info('Scheduled tweet fetch started');

  const usersOfInterest = await userRepository.getUsersOfInterest();

  if (usersOfInterest.length) {
    const sources = usersOfInterest.map(user => user.name);

    const freshTweets = await twitterRepository.getRelevantTweets(
      sources,
      freshnessThreshold,
    );

    if (process.env.NODE_ENV === 'development') {
      console.log(freshTweets);
    }

    if (freshTweets.length) {
      const insertedTweets = await tweetRepository.insertFreshTweets(freshTweets);

      if (insertedTweets.length !== freshTweets.length) {
        // log
      }

      logger.info(`Fetched ${insertedTweets.length} tweets from ${usersOfInterest.length} users`);

      emitter.emit(TWEET_INSERT, insertedTweets);
    }
  }
}
