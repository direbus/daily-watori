import {
  Discord,
  Command,
  CommandMessage,
  CommandNotFound,
} from '@typeit/discord';

@Discord('!')
export abstract class DallyDoseBot {
  /**
   * Add a new relevant Twitter account
   */
  @Command('watch :username')
  private watch(message: CommandMessage) {
    const { username } = message.args;

    if (!username) {
      return message.reply('There\'s no username, dumbass!');
    }

    return message.reply(`The twitter handle is ${username}`);

    /*
    const account = await this.twitterClient.get(
      'users/lookup',
      { screen_name: twitterUsername },
    );

    if (account.length > 0) {
      // save to db
    } else {
      // it doesn't exist!
    }
    */
  }

  /**
   * Remove a Twitter account from watch list
   */
  @Command('unwatch :username')
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

