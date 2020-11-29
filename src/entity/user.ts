import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tweet } from './tweet';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => Tweet, user => user.author)
  tweets: Promise<Tweet[]>;
}
