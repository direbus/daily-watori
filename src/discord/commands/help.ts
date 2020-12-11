import { Message } from 'discord.js';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { CommandHandler } from '../../common/types';
import { prefix } from './../../../bot.config.json';

export default {
  command: 'help',
  description: 'Show the help menu, like you\'re currently seeing',
  execute: async (
    message: Message,
    args: string[], // use the args later
  ): Promise<Message> => {
    if (args.length === 0) {
      const commandFiles = readdirSync(resolve(__dirname));

      // add description here lol
      let reply = 'List of available commands:\n';

      commandFiles.forEach(async (file: string): Promise<void> => {
        const { command, description } = require(
          resolve(__dirname, file),
        ).default as CommandHandler;

        reply += `\n**${prefix}${command}** — ${description}`;
      });

      reply += `\n\nPlease use \`${prefix}help <command_name>\` for more detailed information for that particular command`;

      return message.reply(reply);
    } else {
      return message.reply('UNIMPLEMENTED');
    }
  },
};
