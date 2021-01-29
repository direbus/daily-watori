import { Message, MessageEmbed } from 'discord.js';
import { readdirSync, existsSync } from 'fs';
import { resolve } from 'path';
import { CommandHandler } from '../../common/types';
import { prefix } from './../../../bot.config.json';

export default {
  command: 'help',
  description: 'Show the help menu, which will show the list of available command for this bot.',
  params: [],
  example: `\`${prefix}help\``,
  execute: async (
    message: Message,
    args: string[], // use the args later
  ): Promise<Message> => {
    const { channel } = message;

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

      return channel.send(reply);
    } else {
      if (!existsSync(resolve(__dirname, `${args[0]}.ts`))) {
        return channel.send(`Command ${args[0]} doesn't exist!`);
      }

      const { command, description, example, params }: CommandHandler = require(
        resolve(__dirname, `${args[0]}.ts`),
      ).default;

      const fields = [
        {
          name: 'Description',
          value: description,
        },
      ];

      if (params.length) {
        const argsString = params.map(
          val => `- \`${val.name}\` — ${val.description}`,
        );

        fields.push({
          name: 'Arguments',
          value: argsString.join('\n'),
        });
      }

      fields.push({
        name: 'Example',
        value: example,
      });

      const embed = new MessageEmbed({
        color: 0xE8F0FE,
        title: `**\`${command}\` command**`,
        fields,
      });

      return channel.send({ embed });
    }
  },
};
