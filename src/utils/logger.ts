import { resolve } from 'path';
import pino from 'pino';
import { cwd } from 'process';
import { name } from './../../bot.config.json';

// logger service
export const logger = pino(
  {
    name,
    prettyPrint: {
      colorize: false,
    },
    prettifier: require('pino-pretty'),
  },
  pino.destination(resolve(cwd(), 'bot.log')),
);
