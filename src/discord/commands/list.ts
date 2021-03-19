import { Message } from 'discord.js';
import { Context } from '../../common/types';
import { User } from '../../entity/user';
import { prefix } from './../../../bot.config.json';

export default {
  command: 'list',
  description: 'Show the list of users on the watchlist',
  params: [],
  example: `\`${prefix}list\``,
  execute: async (
    message: Message,
    args: string[],
    { userRepository }: Context,
  ): Promise<Message> => {
    const { channel } = message;
    const users = await userRepository.getUsersOfInterest();

    if (users.length) {
      let reply = 'Below is the list of Twitter users on the watchlist:\n';

      const getTwitterLink = (name: string) => {
        return `https://twitter.com/${name}`;
      };

      users.forEach(({ name }: User): void => {
        reply += `\n**@${name}** — ${getTwitterLink(name)}`;
      });

      return channel.send(reply);
    } else {
      return channel.send('It seems I haven\'t watched anyone yet. Try adding someone to the watchlist with `!watch <name>` command.');
    }
  },
};
