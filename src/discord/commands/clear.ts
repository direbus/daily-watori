import { Message } from 'discord.js';
import { Context } from '../../common/types';
import { prefix } from './../../../bot.config.json';

export default {
  command: 'clear',
  description: 'Deletes all tweets that has been retweeted.',
  params: [],
  example: `\`${prefix}clear\``,
  execute: async (
    message: Message,
    args: string[],
    { tweetRepository }: Context,
  ): Promise<Message> => {
    const { channel } = message;
    const result = await tweetRepository.clearHistory();

    return result ?
      channel.send('Successfully cleared tweets history.') :
      channel.send('Failed to clear tweets history');
  },
};
