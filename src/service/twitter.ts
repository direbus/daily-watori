import Twitter from 'twitter-lite';

import { Status, FullUser } from 'twitter-d';
import { Tweet } from '../entity/tweet';

/**
 * A class that provides services to interact with Twitter API
 */
export class TwitterService {
  // a day in milliseconds
  private static readonly ONE_DAY = 86400000;

  constructor(
    private readonly twitterClient: Twitter,
  ) {}

  /**
   * A utility function to build Twitter's FROM query
   *
   * @param {string[]} source List of user of interest's username
   * @return {string} Formatted Twitter's FROM query part
   */
  private buildFromQuery = (source: string[]): string => {
    return source.map(src => `from:${src}`).join(' OR ');
  }

  /**
   * A utility function to build Twitter status link
   * by exploiting twitter hashbang bug
   *
   * @param {string} id Tweet ID
   * @param {string} name User's screen name
   * @return {string} Twitter status link
   */
  private buildTwitterLink = (id: string, user: string): string => {
    return `https://twitter.com/${user}/status/${id}`;
  }

  /**
   * Retrieve fresh and relevant tweets from users of interest.
   *
   * A tweet is considered to be relevant if it has at least an image on it.
   *
   * A tweet is considered to be fresh if it is posted within timespan of a day.
   *
   * @param {User[]} sources List of user of interests' username
   * @return {Promise<TweetEntity[]>} Array of relevant tweets
   */
  public getRelevantTweets = async (sources: string[]): Promise<Tweet[]> => {
    const { statuses } = await this.twitterClient.get(
      'search/tweets',
      { q: `${this.buildFromQuery(sources)} filter:images` },
    );

    const relevantStatuses = statuses.filter((status: Status) => {
      const createdAt = new Date(status['created_at']);
      const timespan = new Date().getTime() - createdAt.getTime();

      // for some unknown reasons, the 'images' query is still inaccurate
      // this line will prevent tweets that doesn't contain photo(s) on them
      const hasImage = status.entities.media?.some(media => media.type === 'photo');

      return hasImage && (timespan <= TwitterService.ONE_DAY);
    });

    // re-map the result to entity
    return relevantStatuses.map((status: Status): Tweet => {
      const user = status.user as FullUser;

      return Tweet.fromJSON({
        tweetId: status['id_str'],
        author: user.screen_name,
        fetchedAt: new Date(),
        hasRetweeted: false,
      });
    });
  }

  /**
   * Retweet a status from relevant accounts
   *
   * @param {string} tweetId Status ID
   * @return {Promise<boolean>} A boolean that indicates if the process
   * went successfully or not
   */
  public retweet = async (tweetId: string): Promise<boolean> => {
    const response = await this.twitterClient
      .post('statuses/retweet/:id', { id: tweetId });

    return !!response['retweeted_status'];
  }

  /**
   * Check if a user exist in Twitter by its username
   *
   * @param {string} username Twitter screen name
   * @return {Promise<boolean>} `true` if the user exist, `false` otherwise
   */
  public isUserExist = async (username: string): Promise<boolean> => {
    const account = await this.twitterClient.get(
      'users/lookup',
      { screen_name: username },
    );

    return account.length > 0;
  }
}
