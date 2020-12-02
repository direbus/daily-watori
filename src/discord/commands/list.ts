import { Message } from 'discord.js';
import { Context } from '../../common/types';
import { User } from '../../entity/user';

export default {
  command: 'list',
  description: 'Show the list of users on the watchlist',
  execute: async (
    message: Message,
    _: string[],
    { userRepository }: Context,
  ): Promise<Message> => {
    const users = await userRepository.getUsersOfInterest();

    let reply = 'Below is the list of Twitter users on the watchlist:\n';

    const getTwitterLink = (name: string) => {
      return `https://twitter.com/${name}`;
    };

    users.forEach(({ name }: User): void => {
      reply += `\n**@${name}** — [Account](${getTwitterLink(name)})`;
    });

    return message.reply(reply);
  },
};
