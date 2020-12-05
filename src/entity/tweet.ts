/**
 * Tweet object, as seen in database
 */
export interface TweetEntity {
  tweetId: string;
  author: string;
  fetchedAt: Date;
  hasRetweeted: boolean;
  approvedAt?: Date;
}

/**
 * Extended Tweet object with url virtuals.
 *
 * Has from-to entity conversion methods for convenience.
 */
export class Tweet {
  private constructor(
    public readonly tweetId: string,
    public readonly author: string,
    public readonly fetchedAt: Date,
    public readonly hasRetweeted: boolean,
    public readonly approvedAt?: Date,
  ) {}

  public get url(): string {
    return `https://twitter.com/${this.author}/status/${this.tweetId}`;
  }

  public static fromJSON(json: TweetEntity): Tweet {
    return new Tweet(
      json.tweetId,
      json.author,
      json.fetchedAt,
      json.hasRetweeted,
      json.approvedAt,
    );
  }

  public static getIDFromURL(url: string): string {
    return url.split('/').pop() as string;
  }

  public toJSON(): TweetEntity {
    return {
      ...this,
    };
  }
}
