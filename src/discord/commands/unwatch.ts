import { Message } from 'discord.js';
import { TwitterService } from '../../service/twitter';

export default {
  name: 'unwatch',
  description: 'Remove a Twitter user from watchlist',
  simple: false,
  execute: async (
    message: Message,
    args: string[],
    service: TwitterService,
  ): Promise<Message> => {
    if (!args.length) {
      return message.reply('I don\'t know the Twitter username, dumbass!');
    }

    return message.reply(`The username is: ${args[0]}`);

    /*
    const userExist = await service.isUserExist(args[0]);

    if (userExist) {
    } else {
      return message.reply('Please don\'t try to fool me with fake Twitter account');
    }
    */
  },
};
