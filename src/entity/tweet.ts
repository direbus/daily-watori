import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  link: string;

  @ManyToOne(() => Tweet, tweet => tweet.images)
  tweet: Tweet;
}

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  tweetId: string;

  @OneToMany(() => Image, image => image.tweet)
  images: Image[];

  @ManyToOne(() => User, author => author.tweets)
  author: User;

  @CreateDateColumn()
  fetchedAt: Date;

  @Column({ nullable: true })
  approvedAt?: Date;

  @Column({ nullable: false })
  urgent: boolean;

  @Column({ nullable: false })
  hasRetweeted: boolean;
}
