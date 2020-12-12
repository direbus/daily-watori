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
    if (!args.length) {
      return message.reply('The username for the intended target must be supplied');
    }

    const userExist = await userRepository.isUserExist(args[0]);

    if (userExist) {
      const deleteResult = await userRepository.deleteUser(args[0]);

      return deleteResult ?
        message.reply(`Successfully removed **@${args[0]}** from the watchlist`) :
        message.reply(`Failed to remove **@${args[0]}** from the watchlist`);
    } else {
      return message.reply(`This user doesn't exist in the watchlist. Try adding it first using \`${prefix}watch ${args[0]}\``);
    }
  },
};
