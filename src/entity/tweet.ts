import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, name: 'tweet_id' })
  tweetId: string;

  @Column({ nullable: false })
  url: string;

  @ManyToOne(() => User, author => author.tweets, { nullable: false })
  author: User;

  @CreateDateColumn({ name: 'fetched_at' })
  fetchedAt: Date;

  @Column({ nullable: true, name: 'approved_at' })
  approvedAt?: Date;

  @Column({ nullable: false, name: 'has_retweeted' })
  hasRetweeted: boolean;
}
