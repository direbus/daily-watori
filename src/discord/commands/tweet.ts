import { Message } from 'discord.js';
import { Context } from '../../common/types';
import errorToEmbed from '../util/errorToEmbed';
import { prefix } from './../../../bot.config.json';

export default {
  command: 'tweet',
  description: 'Tweets things, instantly.',
  params: [],
  example: `\`${prefix}tweet New episode on sitename, looking forward to watch it!\``,
  execute: async (
    message: Message,
    { twitterRepository }: Context,
  ): Promise<Message> => {
    const { channel } = message;
    try {
      await twitterRepository.sendTweet(message.content.substr(prefix.length));
    } catch (e) {
      return await channel.send("Error while sending the tweet.", errorToEmbed(e));
    }
    return await channel.send("Immediate tweet sent succesfully.");
  },
};
