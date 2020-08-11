import { Client } from '@typeit/discord';
import { config } from 'dotenv';

(async function() {
  if (process.env.NODE_ENV === 'development') {
    config();
  }

  if (!process.env.DISCORD_TOKEN) {
    throw new Error('Discord token has not been set');
  }

  const client = new Client({
    classes: [
      `${__dirname}/discord/client.ts`,
      `${__dirname}/discord/client.js`,
    ],
    variablesChar: ':',
  });

  await client.login(process.env.DISCORD_TOKEN);
})();
