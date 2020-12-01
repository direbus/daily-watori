import { MigrationInterface, QueryRunner } from 'typeorm';

export class seed1606830567440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE user (
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL
      );`,
    );

    await queryRunner.query(
      `CREATE TABLE tweet (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        tweet_id VARCHAR(64) UNIQUE NOT NULL,
        fetched_at TIMESTAMP NOT NULL,
        approved_at TIMESTAMP,
        has_retweeted BOOL NOT NULL,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES user (id)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    
  }
}
