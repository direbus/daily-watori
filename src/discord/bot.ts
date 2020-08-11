import {
  Discord,
  Command,
  CommandMessage,
  CommandNotFound,
} from '@typeit/discord';
import Twitter from 'twitter-lite';

@Discord('!')
export abstract class DallyDoseBot {
  constructor(private readonly twitterClient: Twitter) {}

  /**
   * Add a new relevant Twitter account
   */
  @Command('watch')
  private watch = async (message: CommandMessage) => {
    const twitterUsername = message.commandContent;

    if (twitterUsername.length === 0) {
      // I can't find the username dumbass!
    }

    const account = await this.twitterClient.get(
      'users/lookup',
      { screen_name: twitterUsername },
    );

    if (account.length > 0) {
      // save to db
    } else {
      // it doesn't exist!
    }
  }

  /**
   * Remove a Twitter account from watch list
   */
  @Command('unwatch')
  private unwatch(message: CommandMessage) {
    const twitterUsername = message.commandContent;

    if (twitterUsername.length === 0) {
      // I can't find the username dumbass!
    }
  }

  @CommandNotFound()
  private notFound(message: CommandMessage) {
    // reply with not found thingy
    return message.reply('Fuck you');
  }
}

