import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  twitterId: string;

  @Column()
  lastLogin: Date;

  @Column()
  lastIP: string;
}
