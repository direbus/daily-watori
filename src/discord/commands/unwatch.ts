import { Message } from 'discord.js';
import { Context } from '../../common/types';
import { prefix } from './../../../bot.config.json';

export default {
  command: 'unwatch',
  description: 'Remove a Twitter user from the watchlist',
  params: [
    {
      name: 'name',
      description: 'Twitter user\'s **username** a.k.a **handle**',
    },
  ],
  example: `\`${prefix}unwatch lakban_hitam\``,
  execute: async (
    message: Message,
    args: string[],
    { userRepository }: Context,
  ): Promise<Message> => {
    const { channel } = message;

    if (!args.length) {
      return channel.send('The username for the intended target must be supplied');
    }

    const userExist = await userRepository.isUserExist(args[0]);

    if (userExist) {
      const deleteResult = await userRepository.deleteUser(args[0]);

      return deleteResult ?
        channel.send(`Successfully removed **@${args[0]}** from the watchlist`) :
        channel.send(`Failed to remove **@${args[0]}** from the watchlist`);
    } else {
      return channel.send(`This user doesn't exist in the watchlist. Try adding it first using \`${prefix}watch ${args[0]}\``);
    }
  },
};
