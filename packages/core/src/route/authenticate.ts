import Router from "@koa/router";
import { respondOk } from "../util/response";
export const authRoute = new Router();

authRoute.get("/with/:provider/callback", (ctx, next) => {
  ctx.response.body = respondOk(ctx.state.grant);
})

authRoute.get("/", (ctx, next) => {
  ctx.response.body = respondOk(null, "Hey there!");
})
