import * as controller from "../controllers/questions.ts";
import { Router } from "../deps/oak.ts";

export const questionsRouter = new Router();

questionsRouter.prefix("/questions")
  .get("/", controller.get)
  .get("/:id", controller.getOne)
  .post("/", controller.createOne)
  .delete("/:id", controller.deleteOne);
