import { send, Context } from "../deps/oak.ts";

export async function staticFiles(ctx: Context) {
  const filePath = ctx.request.url.pathname;
  const fileWhitelist = [
    "/index.html",
    "/javascripts/scripts.js",
    "/stylesheets/style.css",
    "/images/favicon.png",
  ];

  if (fileWhitelist.includes(filePath)) {
    await send(ctx, filePath, { root: `${Deno.cwd()}/public` });
  }
}
