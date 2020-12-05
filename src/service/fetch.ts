import { Context, ONE_DAY, TWEET_INSERT } from '../common/types';

/**
 * Fetch fresh tweets, insert them to the database, and
 * fire the TWEET_INSERT event to be handled by next handler.
 */
export async function fetchFreshTweets(
  { userRepository, tweetRepository, twitterRepository, emitter }: Context,
): Promise<void> {
  const usersOfInterest = await userRepository.getUsersOfInterest();
  const sources = usersOfInterest.map(user => user.name);

  const freshTweets = await twitterRepository.getRelevantTweets(
    sources,
    ONE_DAY,
  );

  if (process.env.NODE_ENV === 'development') {
    console.log(freshTweets);
  }

  const insertedTweets = await tweetRepository.insertFreshTweets(freshTweets);

  emitter.emit(TWEET_INSERT, insertedTweets);
}
