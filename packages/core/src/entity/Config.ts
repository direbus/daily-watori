import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'config' })
export class Config {
  @PrimaryColumn()
  id: string;

  @Column()
  value: string;
}
