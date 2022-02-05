import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { FollowedTwitter } from "./FollowedTwitter";

@Entity({ name: "tweets" })
export class Tweet {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public tweetId: string;

  @Column()
  public author: FollowedTwitter;

  @Column()
  public fetchedAt: Date;

  @Column()
  public approvedAt?: Date;

  @Column()
  public failedAt?: Date;

  @Column()
  public retweetedAt?: Date;
}
