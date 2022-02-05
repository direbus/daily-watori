import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "followed_twitter" })
export class FollowedTwitter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  createdOn: Date;

  @Column()
  deletedOn: Date;
}
