import "reflect-metadata";
import { createConnection } from "typeorm";
import { appLogger } from "./util/logger";
import * as Koa from 'koa';


appLogger.info("App starting...");
createConnection().then(async connection => {
  appLogger.info("Database connected.")


  const mainApp = new Koa();

  // Bind anything that helps me doing thingz.

  
  const server = mainApp.listen(process.env.PORT || 3100)

    if (server) {
        let addr = server.address();
        appLogger.info(`Server now listens on ${addr.address}:${addr.port}.`);
    }
}).catch(error => console.log(error));
