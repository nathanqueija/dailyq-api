import { Router } from "../deps/oak.ts";

export const defaultRouter = new Router();

defaultRouter.get("/", (ctx) => {
  ctx.response.body = "HOME";
});
