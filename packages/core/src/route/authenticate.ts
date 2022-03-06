import Router from "@koa/router";
import { respondError, respondOk } from "../util/response";

import validator from "validator";

export const authRoute = new Router();

authRoute.get("/with/:provider/callback", (ctx, next) => {
  ctx.response.body = respondOk(ctx.state.grant);
})

authRoute.get("/", (ctx, next) => {
  let allowedLogin = ["google", "discord", "twitter"];
  let allowedIntent = ["login", "connect"];

  const {intent, provider, redir} = ctx.query;
  if(!validator.isIn(intent as string, allowedIntent)) {
    ctx.response.body = respondError({title:"Invalid intention."});
    ctx.response.status = 400;
    return;
  }
  
  if(!validator.isIn(provider as string, allowedLogin)) {
    ctx.response.body = respondError({title:"Invalid provider."});
    ctx.response.status = 400;
    return;  
  }

  //TODO: validate redir var.

  // try to save data to login.
  if(!ctx.session) {
    ctx.response.body = respondError({title:"Session is not supported. You need to enable cookies."});
    ctx.response.status = 400;
    return;
  }
  ctx.session.loginIntent = intent;
  ctx.session.loginRedir = intent;
  
  // redirect to...
  //TODO: Run redirector
})
