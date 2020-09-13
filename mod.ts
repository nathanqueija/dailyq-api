import {
  staticFiles,
  errorCatcher,
  logger,
  responseTime,
} from "./middlewares/mod.ts";
import { defaultRouter, questionsRouter } from "./routes/mod.ts";
import { setup, handlers, error, info } from "./deps/logger.ts";
import { Application } from "./deps/oak.ts";
import { now } from "./deps/lodash.ts";

const app = new Application();
const PORT = 8000;

await setup({
  handlers: {
    console: new handlers.ConsoleHandler("INFO"),
  },
  loggers: {
    default: {
      level: "INFO",
      handlers: ["console"],
    },
  },
});

app.addEventListener("error", (event) => {
  error(event.error);
});

app.use(errorCatcher);
app.use(logger);
app.use(responseTime);
app.use(defaultRouter.routes());
app.use(defaultRouter.allowedMethods());
app.use(questionsRouter.routes());
app.use(questionsRouter.allowedMethods());
app.use(staticFiles);

if (import.meta.main) {
  app.addEventListener("listen", ({ secure, hostname, port }) => {
    const protocol = secure ? "https://" : "http://";
    const url = `${protocol}${hostname ?? "localhost"}:${port}`;
    info(`Listening on url: ${url} at ${now()}`);
  });

  await app.listen({
    port: PORT,
  });
}
