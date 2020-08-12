import { config } from 'dotenv';
import { TwitterService } from './../src/service/twitter';
import Twitter from 'twitter-lite';
import { Tweet } from '../src/model/twitter';

async function getUsersOfInterest(): Promise<string[]> {
  const users = [
    'aidairo2009',
  ];

  return users; // just return dummy data for now
}

async function fetchTweets(source: string[]): Promise<Tweet[]> {
  if (!process.env.CONSUMER_TOKEN || !process.env.CONSUMER_SECRET) {
    throw new Error('Twitter tokens has not been set');
  }

  const client = new Twitter({
    consumer_key: process.env.CONSUMER_TOKEN,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN,
    access_token_secret: process.env.TWITTER_SECRET,
  });

  return new TwitterService(client).getRelevantTweets(source);
}

(async function() {
  if (process.env.NODE_ENV === 'development') {
    config();
  }

  const usersOfInterest = await getUsersOfInterest();

  const tweets = await fetchTweets(usersOfInterest);

  if (process.env.NODE_ENV === 'development') {
    console.log(tweets);
  }

  // save to DB
})();
