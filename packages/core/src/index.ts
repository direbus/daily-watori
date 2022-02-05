import "reflect-metadata";
import { createConnection } from "typeorm";
import { appLogger } from "./util/logger";
import * as Koa from 'koa';
import connectionConfig from "./util/connection";


import * as koaHelmet from "koa-helmet";
import * as KoaLogger from "koa-logger";
import * as session from "koa-session";
// import * as mount from "koa-mount";

import * as cors from '@koa/cors';
import * as koaBody from 'koa-body';


appLogger.info("App starting...");

createConnection(connectionConfig).then(async connection => {
  appLogger.info("Database connected.")


  const mainApp = new Koa();

  // Bind anything that helps me doing thingz.
  mainApp.use(koaBody());
  mainApp.use(koaHelmet());
  mainApp.use(cors());
  mainApp.use(KoaLogger());
  mainApp.use(session(mainApp));

  const server = mainApp.listen(process.env.PORT || 3100)

  if (server) {
    let addr = server.address();
    appLogger.info(`Server now listens on ${addr.toString()}.`);
  }
}).catch(error => console.log(error));
