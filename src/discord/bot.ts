import { Client, Collection, Guild, Message, MessageReaction, OverwriteResolvable, PartialUser, Role, TextChannel, User } from 'discord.js';
import { format } from 'date-fns';
import { readdirSync } from 'fs';
import { resolve } from 'path';
import { prefix, textChannelName, categoryChannelName, react } from './../../bot.config.json';
import { CommandHandler, Context, HandlerFunction, RETWEET } from '../common/types';
import { Tweet } from '../entity/tweet';
import { logger } from '../utils/logger';
import errorToEmbed from './util/errorToEmbed';

/**
 * Core functionality of the bot. Allows users to interact
 * with tweets and commands.
 */
export class DallyDoseBot {
  private readonly commands: Collection<string, HandlerFunction>;
  private readonly guilds: Collection<string, Guild>;
  public ready: boolean;

  public constructor(
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
    this.ready = false;

    this.client.on('ready', this.onReady);
    this.client.on('message', this.onMessage);
    this.client.on('messageReactionAdd', this.onReact);
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
                'USE_EXTERNAL_EMOJIS',
              ],
              allow: [
                'VIEW_CHANNEL',
                'ADD_REACTIONS',
                'READ_MESSAGE_HISTORY',
                'EMBED_LINKS',
              ],
            }),
          );

        // add a new category channel if preferred
        if (!categoryChannel && categoryChannelName) {
          categoryChannel = await guild.channels.create(
            categoryChannelName,
            {
              type: 'category',
              permissionOverwrites: permissions,
            },
          );
        }

        // add the new text channel that acts as a `news` channel
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

    this.ready = true; // prevents tweet subscription message to be sent when the channel setup has not finished
  }

  /**
   * Respond when a user sends a message to the server
   */
  private onMessage = async (
    message: Message,
  ): Promise<Message | undefined> => {
    if (message.partial) {
      await message.fetch();
    }

    const { author, content, channel } = message;

    if (author.bot ||
        !content.startsWith(prefix) ||
        channel.type !== 'text' ||
        channel.name !== textChannelName) {
      return;
    }

    const args = content.slice(prefix.length).split(/ +/);
    const commandName = (args.shift() as string).toLowerCase();

    const handler = this.commands.get(commandName);
    try {
      if (handler) {
        return handler(message, args, this.context);
      } else {
        return channel.send(
          `Command unknown, please refer to \`${prefix}help\` for more information about how to use this bot.`,
        );
      }
    } catch (e) {
      return await channel.send('Error while processing command.', errorToEmbed(e));
    }
  }

  /**
   * Respond when a reaction is added on tweet notification message
   */
  private onReact = async (
    reaction: MessageReaction,
    user: User | PartialUser,
  ): Promise<void> => {
    // prefer full reaction data
    if (reaction.partial) {
      await reaction.fetch();
    }

    // prefer full user data
    if (user.partial) {
      await user.fetch();
    }

    const { emoji, message } = reaction;
    const { yes, no, instant } = react;

    const channel = message.channel;

    if (
      user.bot ||
      reaction.message.channel.type !== 'text' ||
      (channel as TextChannel).name !== textChannelName ||
      message.reactions.cache.some(react => react.emoji.name === '👌') // prevent handling an already handled tweet
    ) {
      return;
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
    }

    await message.react('👌');
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
      return '**⚠️ FRESH TWEET ALERT ⚠️**' +
        '\n\n' +
        `**👤 Author**: **@${tweet.author}**` +
        '\n' +
        `**⌚ Fetched At**: ${format(tweet.fetchedAt, 'd MMMM yyyy — HH:mm OOOO')}` +
        '\n' +
        `**🌐 Tweet Link** : ${tweet.url}` +
        '\n\n' +
        '**React with the provided emojis below:**' +
        '\n' +
        `- **${react.yes} to add this tweet to the next retweet cycle;**` +
        '\n' +
        `- **${react.no} to reject this tweet;**` +
        '\n' +
        `- **${react.instant} to retweet this tweet at once.**`;
    };

    this.guilds.forEach(async (guild: Guild): Promise<void> => {
      const channel = guild.channels.cache.find(
        channel => channel.name === textChannelName,
      );

      if (channel) {
        const textChannel = channel as TextChannel;

        const messages = tweets.map(async (tweet: Tweet) => {
          const message = await textChannel.send(messageFormatter(tweet));

          const reactions = Object.values(react).map(
            val => message.react(val),
          );

          await Promise.all(reactions);
        });

        await Promise.all(messages);
      } else {
        logger.error(`Failed to initialize bot correctly on ${guild.name}`);
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
