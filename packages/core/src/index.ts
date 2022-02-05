// import * as mount from "koa-mount";
import { default as cors } from '@koa/cors';
import { default as Koa } from 'koa';
import { default as koaBody } from 'koa-body';
import { default as koaHelmet } from 'koa-helmet';
import { default as KoaLogger } from 'koa-logger';
import { default as session } from 'koa-session';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import connectionConfig from './util/connection';
import { appLogger } from './util/logger';

appLogger.info('App starting...');
createConnection(connectionConfig).then(async () => {
  appLogger.info('Database connected.');


  const mainApp = new Koa();

  // Bind anything that helps me doing thingz.
  mainApp.use(koaBody());
  mainApp.use(koaHelmet());
  mainApp.use(cors());
  mainApp.use(KoaLogger());
  mainApp.use(session(mainApp));

  const server = mainApp.listen(process.env.PORT || 3100);

  if (server) {
    const addr = server.address();
    if (addr instanceof String) {
      appLogger.info(`Server now listens on ${addr}.`);
    } else if (addr instanceof Object) {
      appLogger.info(`Server now listens on ${addr.address.toString()}:${addr.port}.`);
    }
  }
}).catch(error => console.log(error));

export default null;
