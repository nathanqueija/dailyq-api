import { Question, toCsvRow } from "./Question.ts";
import { test, assertEquals } from "../deps/test.ts";

test("CSV ROW PARSER", () => {
  const question: Question = {
    id: "id",
    content: "content",
    category: "category",
  };

  const parsed = toCsvRow(question);
  assertEquals(parsed, "id,content,category");
});
