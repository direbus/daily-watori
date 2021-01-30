import { Message } from 'discord.js';
import { Context } from '../../common/types';
import { prefix } from '../../../bot.config.json';
import { name, version } from "../../../package.json";

export default {
  command: 'stats',
  description: 'Show current fleet info such as version.',
  params: [],
  example: `\`${prefix}stats\``,
  execute: async (
    message: Message,
    _: string[],
    { twitterRepository }: Context,
  ): Promise<Message> => {
    const { channel } = message;
    let userInfo = await twitterRepository.getSelfInfo();

    let reply = [
      `App run on ${name}@v${version}.`,
      `Twitter Account bound on \`${userInfo?.name} @${userInfo?.screen_name}\``,
      `https://twitter.com/${userInfo?.screen_name}`
    ];

    return channel.send(reply.join("\n"));
  },
};
