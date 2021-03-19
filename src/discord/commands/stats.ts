import { Message, MessageEmbed } from 'discord.js';
import { Context } from '../../common/types';
import { prefix } from '../../../bot.config.json';
import { name, version } from '../../../package.json';

export default {
  command: 'stats',
  description: 'Show current fleet info such as version.',
  params: [],
  example: `\`${prefix}stats\``,
  execute: async (
    message: Message,
    args: string[],
    { twitterRepository }: Context,
  ): Promise<Message> => {
    const { channel } = message;
    const userInfo = await twitterRepository.getSelfInfo();

    const infoEmbed = new MessageEmbed();
    infoEmbed.setColor('#a0eeee')
      .setTitle('Fleet Info')
      .addField('Version', `${name}@v${version}`)
      .addField('Twitter Account', `https://twitter.com/${userInfo?.screen_name}`); // eslint-disable-line camelcase

    return channel.send('Here\'s our info:', infoEmbed);
  },
};
