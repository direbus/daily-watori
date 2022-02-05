import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FollowedTwitter } from "./FollowedTwitter";

@Entity({ name: "tweets" })
export class Tweet {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public tweetId: string;

  @OneToMany(() => FollowedTwitter, author => author.tweets)
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
