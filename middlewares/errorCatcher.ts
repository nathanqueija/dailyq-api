import type { Context } from "../deps/oak.ts";

export async function errorCatcher(ctx: Context, next: any) {
  try {
    await next();
  } catch (e) {
    ctx.response.body = "Internal server error";
    throw e;
  }
}
