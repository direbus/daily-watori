import { config } from 'dotenv';
import Twitter from 'twitter-lite';
import { Tweet } from '../../entity/tweet';
import { User } from '../../entity/user';
import { TweetRepository } from '../../repository/tweet';
import { UserRepository } from '../../repository/user';
import { getDb } from '../../utils/db';
import { TwitterService } from '../twitter';

async function fetchFreshTweets(users: User[]): Promise<Tweet[]> {
  if (!process.env.CONSUMER_TOKEN || !process.env.CONSUMER_SECRET) {
    throw new Error('Twitter tokens has not been set');
  }

  const client = new Twitter({
    consumer_key: process.env.CONSUMER_TOKEN,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN,
    access_token_secret: process.env.TWITTER_SECRET,
  });

  const sources = users.map(user => user.name);

  return new TwitterService(client).getRelevantTweets(sources);
}

(async function() {
  if (process.env.NODE_ENV === 'development') {
    config();
  }

  const db = await getDb();
  const userRepository = new UserRepository(db);
  const tweetRepository = new TweetRepository(db);

  const usersOfInterest = await userRepository.getUsersOfInterest();

  const tweets = await fetchFreshTweets(usersOfInterest);

  if (process.env.NODE_ENV === 'development') {
    console.log(tweets);
  }

  // save to DB
  try {
    await tweetRepository.insertFreshTweets(tweets);
  } catch (err) {
    throw new Error(`Failed to save tweets to database. Reason: ${err.message}`);
  }
})();
