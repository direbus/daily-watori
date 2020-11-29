import { config } from 'dotenv';
import { TwitterService } from './../src/service/twitter';
import Twitter from 'twitter-lite';
import { Tweet } from '../src/entity/tweet';
import { createConnection } from 'typeorm';
import { User } from './../src/entity/user';
import { TweetRepository } from '../src/repository/tweet';
import { UserRepository } from '../src/repository/user';

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

  const dbConnection = await createConnection();
  const tweetRepo = dbConnection.getCustomRepository(TweetRepository);
  const userRepo = dbConnection.getCustomRepository(UserRepository);

  const usersOfInterest = await userRepo.getUsersOfInterest();

  const tweets = await fetchFreshTweets(usersOfInterest);

  if (process.env.NODE_ENV === 'development') {
    console.log(tweets);
  }

  // save to DB
  try {
    await tweetRepo.insertFreshTweets(tweets);
  } catch (err) {
    throw new Error(`Failed to save tweets to database. Reason: ${err.message}`);
  }
})();
