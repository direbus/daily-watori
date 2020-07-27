import { config } from 'dotenv';
import { getRelevantTweets } from './../src/service/twitter';
import Twitter from 'twitter-lite';

if (process.env.NODE_ENV === 'development') {
  config();

  if (!process.env.CONSUMER_TOKEN || !process.env.CONSUMER_SECRET) {
    throw new Error('Twitter tokens has not been set');
  }
}

const client = new Twitter({
  consumer_key: process.env.CONSUMER_TOKEN || '',
  consumer_secret: process.env.CONSUMER_SECRET || '',
  access_token_key: process.env.TWITTER_TOKEN,
  access_token_secret: process.env.TWITTER_SECRET,
});

const users = [
  'aidairo2009',
];

getRelevantTweets(client, users).then((tweets) => {
  tweets.forEach(tweet => console.log(tweet));
});
