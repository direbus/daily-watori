import { dirname, join } from "path";
import { ConnectionOptions } from "typeorm";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

let config: ConnectionOptions = {
  type: "mysql",
  host: "localhost" || process.env?.DB_HOST,
  port: 3306 || parseInt(process.env?.DB_PORT),
  username: "test" || process.env?.DB_USERNAME,
  password: "test" || process.env?.DB_PASSWORD,
  database: "test" || process.env?.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [
    join(dirname(__filename), "../entity/**/*.ts")
  ],
  migrations: [
    join(dirname(__filename), "../migration/**/*.ts")
  ],
  subscribers: [
    join(dirname(__filename), "../subscriber/**/*.ts")
  ],
}


export default config;
