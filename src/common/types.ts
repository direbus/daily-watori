import { Message } from 'discord.js';
import { TweetRepository } from '../repository/tweet';
import { UserRepository } from '../repository/user';
import { TwitterService } from '../service/twitter';

export interface Context {
  userRepository: UserRepository;
  tweetRepository: TweetRepository;
  twitterService: TwitterService;
}

export interface HandlerFunction {
  (message: Message, args: string[], ctx: Context): Promise<Message>;
}

export interface CommandHandler {
  command: string;
  description: string;
  execute: HandlerFunction;
}
