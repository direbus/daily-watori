import { dirname, join } from 'path';
import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME || 'test',
  password: process.env.DB_PASSWORD || 'test',
  database: process.env.DB_DATABASE || 'test',
  synchronize: false,
  logging: false,
  entities: [
    join(dirname(__filename), '../entity/**/*.ts'),
  ],
  migrations: [
    join(dirname(__filename), '../migration/**/*.ts'),
  ],
  subscribers: [
    join(dirname(__filename), '../subscriber/**/*.ts'),
  ],
};

export default config;
