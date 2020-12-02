import { Client, Collection, Message } from 'discord.js';
import { prefix } from './../../bot.config.json';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { CommandHandler, Context, HandlerFunction } from '../common/types';

export class DallyDoseBot {
  private readonly commands: Collection<string, HandlerFunction>;

  constructor(
    private readonly discordClient: Client,
    private readonly context: Context,
  ) {
    this.commands = new Collection();

    const commandFiles = readdirSync(resolve(__dirname, 'commands'));
    commandFiles.forEach(async (file: string): Promise<void> => {
      const { command, execute }: CommandHandler = await import(
        resolve(__dirname, 'commands', file)
      );

      this.commands.set(command, execute);
    });

    this.registerListeners();
  }

  private registerListeners = () => {
    this.discordClient.addListener('message', (message: Message) => {
      if (message.author.bot || !message.content.startsWith(prefix)) {
        return;
      }

      const args = message.content.slice(prefix.length).split(/ +/);
      const commandName = (args.shift() as string).toLowerCase();

      const handler = this.commands.get(commandName);

      if (handler) {
        return handler(message, args, this.context);
      } else {
        return message.reply(
          `Command unknown, please refer to \`${prefix}help\` for more information about how to use this bot.`,
        );
      }
    });
  }

  public start = async (token: string): Promise<boolean> => {
    const usedToken = await this.discordClient.login(token);

    return usedToken === token;
  }
}
