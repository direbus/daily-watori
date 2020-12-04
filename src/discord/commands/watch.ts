import { Message } from 'discord.js';
import { Context } from '../../common/types';
import { User } from '../../entity/user';

export default {
  command: 'watch',
  description: 'Add a Twitter user to the watchlist',
  execute: async (
    message: Message,
    args: string[],
    { twitterRepository: twitterService, userRepository }: Context,
  ): Promise<Message> => {
    if (!args.length) {
      return message.reply('The username for the intended target must be supplied!');
    }

    const twitterUserExist = await twitterService.isUserExist(args[0]);

    if (twitterUserExist) {
      const dbUserExist = await userRepository.isUserExist(args[0]);

      if (!dbUserExist) {
        return message.reply('This username is already exist on the watchlist.');
      }

      const user: User = {
        name: args[0],
      };

      const insertResult = await userRepository.addUser(user);

      if (insertResult) {
        return message.reply(`Successfully inserted **@${args[0]}** to the watchlist, now this server will recieve any tweets from that user`);
      }

      return message.reply(`Failed to insert **@${args[0]}** to the watchlist`);
    } else {
      return message.reply('This username doesn\'t exist on Twitter. Remember that the bot needs the **username** not the **screen name**.');
    }
  },
};
