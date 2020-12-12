import { Client, Collection, Guild, Message, MessageReaction, OverwriteResolvable, Role, TextChannel, User } from 'discord.js';
import { format } from 'date-fns';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { prefix, textChannelName, categoryChannelName, react } from './../../bot.config.json';
import { CommandHandler, Context, HandlerFunction, RETWEET } from '../common/types';
import { Tweet } from '../entity/tweet';

/**
 * Core functionality of the bot. Allows users to interact
 * with tweets and commands.
 */
export class DallyDoseBot {
  private readonly commands: Collection<string, HandlerFunction>;
  private readonly guilds: Collection<string, Guild>;

  constructor(
    private readonly client: Client,
    private readonly context: Context,
  ) {
    this.commands = new Collection();

    const commandFiles = readdirSync(resolve(__dirname, 'commands'));
    commandFiles.forEach(async (file: string): Promise<void> => {
      const { command, execute } = require(
        resolve(__dirname, 'commands', file),
      ).default as CommandHandler;

      this.commands.set(command, execute);
    });

    this.guilds = client.guilds.cache;

    this.client.addListener('message', this.onMessage);
    this.client.addListener('messageReactionAdd', this.onReact);
    this.client.addListener('ready', this.onReady);
  }

  /**
   * Responds when the bot is online
   */
  private onReady = async (): Promise<void> => {
    // for each connected guild, create a text channel to manage this bot
    this.guilds.forEach(async (guild: Guild) => {
      let categoryChannel = guild.channels.cache.find(
        channel => channel.name === categoryChannelName && channel.type === 'category',
      );

      let textChannel = guild.channels.cache.find(
        channel => channel.name === textChannelName && channel.type === 'text',
      );

      if (!textChannel) { // create a new channel to manage your tweets
        const permissions: OverwriteResolvable[] = guild.roles.cache
          .map(
            (role: Role): OverwriteResolvable => ({
              id: role,
              deny: [
                'ATTACH_FILES',
                'SEND_TTS_MESSAGES',
                'MENTION_EVERYONE',
                'EMBED_LINKS',
                'USE_EXTERNAL_EMOJIS',
              ],
              allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
            }),
          );

        if (!categoryChannel && categoryChannelName) {
          categoryChannel = await guild.channels.create(
            categoryChannelName,
            {
              type: 'category',
              permissionOverwrites: permissions,
            },
          );
        }

        textChannel = await guild.channels.create(
          textChannelName,
          {
            type: 'text',
            parent: categoryChannel,
            permissionOverwrites: permissions,
          },
        );
      }
    });

    this.client.user?.setPresence({
      status: 'online',
      activity: {
        type: 'CUSTOM_STATUS',
        name: 'Managing your daily dose of tweets',
      },
    });
  }

  /**
   * Respond when a user sends a message to the server
   */
  private onMessage = async (message: Message): Promise<Message | undefined> => {
    const channel = message.channel as TextChannel;
    if (message.author.bot ||
        !message.content.startsWith(prefix) ||
        message.channel.type !== 'text' ||
        channel.name !== textChannelName) {
      return;
    }

    if (message.partial) { // prevent partials
      await message.fetch();
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
  }

  /**
   * Respond when a reaction is added on tweet notification message
   */
  private onReact = async (reaction: MessageReaction, user: User): Promise<void> => {
    const { partial, emoji, message } = reaction;
    const { yes, no, instant } = react;

    const channel = message.channel;

    if (
      reaction.message.channel.type !== 'news' ||
      (channel as TextChannel).name !== textChannelName ||
      user.bot
    ) {
      return;
    }

    if (partial) { // prevent partials
      await reaction.fetch();
    }

    const url = /https:\/\/twitter.com\/\w+\/status\/(\d+)/;
    const tweetId = (message.content.match(url) as RegExpMatchArray)[1];

    if (emoji.name === no) {
      await this.context.tweetRepository.rejectTweet(
        tweetId,
      );
    } else if (emoji.name === instant || emoji.name === yes) {
      await this.context.tweetRepository.approveTweet(
        tweetId,
        message.createdAt,
      );

      if (emoji.name === instant) {
        this.context.emitter.emit(RETWEET, tweetId);
      }

      await message.react('👌');
    }
  }

  /**
   * Send tweet notification to the news channel,
   * allowing administrators to interact with it.
   *
   * @param {Tweet[]} tweets List of new relevant tweets
   * @returns {Promise<void>} A promise that contains nothing
   */
  public sendFreshTweets = async (tweets: Tweet[]): Promise<void> => {
    const messageFormatter = (tweet: Tweet) => {
      return '**FRESH TWEETS**' +
        '\n\n' +
        `Author: **@${tweet.author}**` +
        '\n' +
        `Fetched At: ${format(tweet.fetchedAt, 'd MMMM yyyy — HH:mm Z')}` +
        '\n' +
        `Link: ${tweet.url}` +
        '\n\n' +
        '**React to manage this tweet**';
    };

    this.guilds.forEach(async (guild: Guild): Promise<void> => {
      const channel = guild.channels.cache.find(
        channel => channel.name === textChannelName,
      );

      if (channel) {
        const textChannel = channel as TextChannel;

        const messages = await Promise.all(
          tweets.map(
            tweet => textChannel.send(messageFormatter(tweet)),
          ),
        );

        await Promise.all(messages);
      } else {
        throw new Error('Failed to initialize bot correctly');
      }
    });
  }

  /**
   * Start the bot with supplied token
   *
   * @param {string} token Discord token
   * @returns {Promise<boolean>} A boolean whether if login commited successfully
   */
  public start = async (token: string): Promise<boolean> => {
    const usedToken = await this.client.login(token);

    return usedToken === token;
  }
}
