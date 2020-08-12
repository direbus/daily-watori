import { Client, Collection, Message } from 'discord.js';
import { TwitterService } from '../service/twitter';
import { prefix } from './../../bot.config.json';
import { readdirSync } from 'fs';

interface CommandHandler {
  name: string,
  description: string,
  simple: boolean,

  execute(message: Message): Promise<Message>;
  execute(message: Message, args: string[], service: TwitterService): Promise<Message>;
}

export class DallyDoseBot {
  private readonly commands: Collection<string, CommandHandler>;

  constructor(
    private readonly discordClient: Client,
    private readonly twitterService: TwitterService,
  ) {
    this.commands = new Collection();

    const commandFiles = readdirSync(`${__dirname}/commands`);
    commandFiles.forEach((file: string): void => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const importFile = require(`${__dirname}/commands/${file}`);
      const commandHandler: CommandHandler = importFile.default;

      this.commands.set(commandHandler.name, commandHandler);
    });

    this.addCommandListeners();
  }

  private addCommandListeners = () => {
    this.discordClient.addListener('message', (message: Message) => {
      if (message.author.bot || !message.content.startsWith(prefix)) {
        return;
      }

      const args = message.content.slice(prefix.length).split(/ +/);
      const commandName = (args.shift() as string).toLowerCase();

      const commandHandler = this.commands.get(commandName);

      if (commandHandler) {
        return commandHandler.simple ?
          commandHandler.execute(message) :
          commandHandler.execute(message, args, this.twitterService);
      } else {
        return message.reply('IDK wtf are you smoking lol');
      }
    });
  }

  public start = async (token: string): Promise<boolean> => {
    const usedToken = await this.discordClient.login(token);

    return usedToken === token;
  }
}
