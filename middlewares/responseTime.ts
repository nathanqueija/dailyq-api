import type { Context } from "../deps/oak.ts";

export async function responseTime(ctx: Context, next: any) {
  const start = Date.now();
  await next();
  const delta = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", delta.toString());
}
