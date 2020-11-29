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

  @Column({ nullable: false, unique: true })
  tweetId: string;

  @OneToMany(() => Image, image => image.tweet, { eager: true })
  images: Image[];

  @ManyToOne(() => User, author => author.tweets)
  author: Promise<User>;

  @CreateDateColumn()
  fetchedAt: Date;

  @Column({ nullable: true })
  approvedAt?: Date;

  @Column({ nullable: false })
  hasRetweeted: boolean;
}
