import { SystemChannelFlags } from 'discord.js';
import { config } from 'dotenv';
import { exit } from 'process';
import { UserRepository } from './repository/user';
import { getDb } from './utils/db';

(async () => {
  config();

  await getDb();

  exit();
  /*
  const userRepository = new UserRepository(db);

  await userRepository.addUser({ name: 'ganteng' });*/
})();
