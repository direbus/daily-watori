import Twitter from 'twitter-lite';
import { Status, FullUser } from 'twitter-d';
import { Tweet } from '../entity/tweet';
import { format } from 'date-fns';

/**
 * A class that provides services to interact with Twitter API
 */
export class TwitterRepository {
  public constructor(
    private readonly twitterClient: Twitter,
  ) { }

  /**
   * A utility function to build Twitter's search query,
   * includes from:, filter:, and since: queries
   *
   * @param {string[]} source List of user of interest's username
   * @param {number} lifetime Tweet 'freshness' in milliseconds, a tweet is
   * considered to be fresh if it's posted within the provided timespan.
   * @return {string} Formatted Twitter's FROM query part
   */
  private buildQuery = (
    source: string[],
    lifetime: number,
  ): string => {
    // add sources filter
    let query = source.map(src => `from:${src}`).join(' OR ');

    // add images filter
    query += ' AND filter:images OR filter:twimg';

    // add lifetime filter
    const sinceMillis = new Date().getTime() - lifetime;
    const sinceDate = new Date(sinceMillis);

    query += ` AND since:${format(sinceDate, 'yyyy-MM-dd')}`;

    return query;
  }

  /**
   * Retrieve fresh and relevant tweets from users of interest.
   *
   * A tweet is considered to be relevant if it has at least an image on it.
   *
   * @param {User[]} sources List of user of interests' username
   * @param {number} lifetime Tweet 'freshness' in milliseconds, a tweet is
   * considered to be fresh if it's posted within the provided timespan.
   * @return {Promise<TweetEntity[]>} Array of relevant tweets
   */
  public getRelevantTweets = async (
    sources: string[],
    lifetime: number,
  ): Promise<Tweet[]> => {
    const { statuses } = await this.twitterClient.get(
      'search/tweets',
      { q: this.buildQuery(sources, lifetime) },
    );

    // re-map the result to entity
    return statuses.map((status: Status): Tweet => {
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
    try {
      const response = await this.twitterClient
        .post('statuses/retweet', { id: tweetId });

      return !!response['retweeted_status'];
    } catch (e) {
      return false;
    }
  }

  /**
   * Check if a user exist in Twitter by its username
   *
   * @param {string} username Twitter screen name
   * @return {Promise<boolean>} `true` if the user exist, `false` otherwise
   */
  public isUserExist = async (username: string): Promise<boolean> => {
    try {
      await this.twitterClient.get(
        'users/lookup',
        { screen_name: username },
      );

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get information regarding current authenticated tweet account.
   *
   * @return {Promise<FullUser | null>} user profile, and null when it fails.
   */
  public getSelfInfo = async (): Promise<FullUser | null> => {
    try {
      const response: Status[] = await this.twitterClient.get(
        'statuses/user_timeline',
        { count: 1, include_rts: true, exclude_replies: false },
      );

      if (response.length == 0) {
        return null;
      }

      return response[0].user as FullUser;
    } catch (e) {
      return null;
    }
  }

  /**
   * Send tweets.
   *
   * @param message Tweet/status string.
   * @returns a Tweet object.
   */
  public async sendTweet(message: string): Promise<Tweet> {
    return await this.twitterClient.post<Tweet>('statuses/update', {
      status: message,
    });
  }
}
