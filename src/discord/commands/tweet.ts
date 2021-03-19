import { Message } from 'discord.js';
import { Context } from '../../common/types';
import errorToEmbed from '../util/errorToEmbed';
import { prefix } from './../../../bot.config.json';

export default {
  command: 'tweet',
  description: 'Tweets things, instantly.',
  params: [
    {
      name: 'text',
      description: 'Tweet message/status.',
    },
  ],
  example: `\`${prefix}tweet New episode on sitename, looking forward to watch it!\``,
  execute: async (
    message: Message,
    args: string[],
    { twitterRepository: twitterService }: Context,
  ): Promise<Message> => {
    const { channel } = message;
    try {
      await twitterService.sendTweet(message.content.substr(prefix.length + 'tweet'.length));
    } catch (e) {
      return await channel.send('Error while sending the tweet.', errorToEmbed(e));
    }
    return await channel.send('Immediate tweet sent succesfully.');
  },
};
