import { EventEmitter } from 'events';
import { Client } from 'discord.js';
import { config } from 'dotenv';
import { schedule } from 'node-cron';
import Twitter from 'twitter-lite';
import { DallyDoseBot } from './discord/bot';
import { TwitterRepository } from './repository/twitter';
import { TweetRepository } from './repository/db/tweet';
import { UserRepository } from './repository/db/user';
import { getDb } from './utils/db';
import { fetchSchedule, retweetSchedule } from './../bot.config.json';
import { retweet, scheduledRetweet } from './service/retweet';
import { fetchFreshTweets } from './service/fetch';
import { RETWEET, TWEET_INSERT } from './common/types';
import { Tweet } from './entity/tweet';

(async function() {
  if (process.env.NODE_ENV === 'development') {
    config();
  }

  const emitter = new EventEmitter();

  const db = await getDb();
  const tweetRepository = new TweetRepository(db);
  const userRepository = new UserRepository(db);

  if (!process.env.CONSUMER_TOKEN || !process.env.CONSUMER_SECRET) {
    throw new Error('Twitter tokens has not been set');
  }

  if (!process.env.DISCORD_TOKEN) {
    throw new Error('Discord token has not been set');
  }

  const discordClient = new Client();
  const twitterClient = new Twitter({
    consumer_key: process.env.CONSUMER_TOKEN,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_TOKEN,
    access_token_secret: process.env.TWITTER_SECRET,
  });

  const twitterRepository = new TwitterRepository(twitterClient);
  const context = {
    twitterRepository,
    tweetRepository,
    userRepository,
    emitter,
  };

  const bot = new DallyDoseBot(discordClient, context);

  emitter.on(TWEET_INSERT, async (tweets: Tweet[]) => {
    if (bot.ready) {
      await bot.sendFreshTweets(tweets);
    }
  });
  emitter.on(RETWEET, async (tweetId: string) => {
    await retweet(tweetId, context);
  });

  try {
    const feedback = await bot.start(process.env.DISCORD_TOKEN);

    if (feedback) {
      if (process.env.NODE_ENV === 'development') {
        console.log('DallyDose successfully connected to Discord server!');

        await fetchFreshTweets(context); // fetch it once
      }

      // fetch fresh tweets every 24 hour
      schedule(fetchSchedule, async () => {
        await fetchFreshTweets(context);
      });
      // retweet approved tweets every 8 hour
      schedule(retweetSchedule, async () => {
        await scheduledRetweet(context);
      });
    } else {
      throw new Error('Mismatched login token and configured token');
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }

    throw err;
  }
})();
