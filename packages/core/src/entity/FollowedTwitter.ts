import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tweet } from './Tweet';

@Entity({ name: 'followed_twitter' })
export class FollowedTwitter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createdOn: Date;

  @Column()
  deletedOn: Date;

  @ManyToOne(() => Tweet, tweet => tweet.author)
  tweets: Tweet[];
}
