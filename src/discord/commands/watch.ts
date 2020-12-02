import { Message } from 'discord.js';
import { Context } from '../../common/types';

export default {
  command: 'watch',
  description: 'Add a Twitter user to the watchlist',
  execute: async (
    message: Message,
    args: string[],
    { twitterService, userRepository }: Context,
  ): Promise<Message> => {
    if (!args.length) {
      return message.reply('The username must be supplied!');
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
