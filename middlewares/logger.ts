import type { Context } from "../deps/oak.ts";
import { info } from "../deps/logger.ts";

export async function logger(ctx: Context, next: any) {
  await next();

  info(
    `${ctx.request.method} -> ${ctx.request.url.href}: ${
      ctx.response.headers.get("X-Response-Time")
    }ms`,
  );
}
