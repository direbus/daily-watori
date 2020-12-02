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
    const commandFiles = readdirSync(resolve(__dirname));

    // add description here lol
    let reply = 'List of available commands:\n';

    commandFiles.forEach(async (file: string): Promise<void> => {
      const { command, description }: CommandHandler = await import(
        resolve(__dirname, file)
      );

      reply += `\n**${prefix}${command}** — ${description}`;
    });

    reply += `\nPlease use \`${prefix}help <command_name>\` for more detailed information for the command`;

    return message.reply(reply);
  },
};
