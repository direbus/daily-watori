import { Message } from 'discord.js';
import { Context } from '../../common/types';
import { User } from '../../entity/user';
import { prefix } from './../../../bot.config.json';

export default {
  command: 'watch',
  description: 'Add a Twitter user to the watchlist',
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
    { twitterRepository: twitterService, userRepository }: Context,
  ): Promise<Message> => {
    if (!args.length) {
      return message.reply('The username for the intended target must be supplied!');
    }

    let name = args[0];

    if (name.startsWith('@')) {
      name = name.slice(1);
    }

    const twitterUserExist = await twitterService.isUserExist(name);

    if (twitterUserExist) {
      const dbUserExist = await userRepository.isUserExist(name);

      if (dbUserExist) {
        return message.reply('This username is already exist on the watchlist.');
      }

      const user: User = {
        name,
      };

      const insertResult = await userRepository.addUser(user);

      if (insertResult) {
        return message.reply(`Successfully inserted **@${name}** to the watchlist, now this server will receive image tweets from **@${name}**`);
      }

      return message.reply(`Failed to insert **@${name}** to the watchlist`);
    } else {
      return message.reply('This username doesn\'t exist on Twitter. Remember that the bot needs the **username** not the **screen name**.');
    }
  },
};
