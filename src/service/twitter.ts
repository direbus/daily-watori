import Twitter from 'twitter-lite';

import { Status, FullUser, MediaEntity } from 'twitter-d';
import { Tweet } from './../model/twitter';

// 1 day to milliseconds
const ONE_DAY = 86400000;

/**
 * A utility function to build Twitter's FROM query
 *
 * @param {string[]} from List of user of interest's username
 * @return {string} Formatted Twitter's FROM query part
 */
function buildFromQuery(from: string[]): string {
  return from.map(val => `from:${val}`).join(' OR ');
}

/**
 * Retrieve fresh and relevant tweets from users of interest
 *
 * @param {Twitter} client Twitter client instance
 * @param {string[]} from List of user of interest's username
 * @return {Promise<Tweet[]>} Array of relevant tweets
 */
export async function getRelevantTweets(
  client: Twitter,
  from: string[],
): Promise<Tweet[]> {
  const { statuses } = await client.get(
    'search/tweets',
    { q: `${buildFromQuery(from)} filter:images` },
  );

  // Get only relevant tweets
  // A tweet is considered to be relevant if it has at least an image on it and
  // it's posted within a timespan of one day
  const relevantStatuses = statuses.filter((status: Status) => {
    const createdAt = new Date(status['created_at']);
    const timespan = new Date().getTime() - createdAt.getTime();

    // for some unknown reasons, the 'images' query is still inaccurate
    // this line will prevent tweets that doesn't contain photo(s) on them
    const hasImage = status.entities.media?.some(media => media.type === 'photo');

    return hasImage && (timespan <= ONE_DAY);
  });

  return relevantStatuses.map((status: Status): Tweet => {
    const user = status.user as FullUser;
    const images = status.entities.media as MediaEntity[];

    return {
      id: status['id_str'],
      author: user.screen_name,
      images: images.map(photo => photo.media_url_https),
      fetchedAt: new Date(),
    };
  });
}

/**
 * Retweet a status from relevant accounts
 *
 * @param {Twitter} client Twitter client instance
 * @param {string} id Status ID
 * @return {Promise<boolean>} A boolean that indicates if the process
 * went successfully or not
 */
export async function retweet(client: Twitter, id: string): Promise<boolean> {
  const response = await client.post('statuses/retweet/:id', { id });

  return !!response['retweeted_status'];
}
