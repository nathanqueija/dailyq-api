import { getAll, Question, create, remove } from "../models/Question.ts";
import type { RouterContext } from "../deps/oak.ts";
import { v4 } from "../deps/uuid.ts";

export const get = async (ctx: RouterContext) => {
  const questions = await getAll();

  ctx.response.status = 200;
  ctx.response.body = questions;
};

export const getOne = async (ctx: RouterContext<{ id: string }>) => {
  const id = ctx.params?.id;

  if (id) {
    const questions = await getAll();
    const question = questions.find((q) => q.id === id);

    if (question) {
      ctx.response.status = 200;
      ctx.response.body = questions.find((q) => q.id === id);
    } else {
      ctx.throw(400, `Question with id: ${id} doesn't exist`);
    }
  }
};

export const createOne = async (ctx: RouterContext) => {
  const body = ctx.request.body();

  const { category, content } = await body.value as Omit<Question, "id">;

  const id = v4.generate();

  const newQuestion: Question = {
    id,
    content,
    category,
  };

  create(newQuestion);

  ctx.response.status = 201;
  ctx.response.body = newQuestion;
};

export const deleteOne = async (ctx: RouterContext<{ id: string }>) => {
  const id = ctx.params?.id;

  if (id) {
    const questionRemoved = await remove(id);

    if (questionRemoved) {
      ctx.response.status = 200;
      ctx.response.body = questionRemoved;
    } else {
      ctx.throw(400, `Question with id: ${id} doesn't exist`);
    }
  }
};
