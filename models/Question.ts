import { join } from "../deps/path.ts";
import { BufReader } from "../deps/io.ts";
import { parseCsv } from "../deps/encoding.ts";

export interface Question {
  id: string;
  content: string;
  category: string;
}

const DATABASE_FILE = "questions.csv";
const filePath = join("data", DATABASE_FILE);

export function toCsvRow(question: Question) {
  return `${question.id},${question.content},${question.category}`;
}

async function loadQuestions() {
  const file = await Deno.open(filePath);

  const bufReader = new BufReader(file);

  const parsedQuestions = await parseCsv(
    bufReader,
    { header: true, comment: "#" },
  ) as Question[];

  Deno.close(file.rid);

  return parsedQuestions;
}

export async function create(newQuestion: Question) {
  const fileData = await Deno.readTextFile(filePath);

  const newData = fileData + "\n" +
    toCsvRow(newQuestion);

  await Deno.writeTextFile(filePath, newData);
}

export async function remove(id: string) {
  const questions = await loadQuestions();
  const questionToRemove = questions.find((q) => q.id === id);

  if (questionToRemove) {
    const filteredQuestions = questions.filter((q) => q.id !== id);
    const fileData = await Deno.readTextFile(filePath);
    const csvHeader = fileData.split("\n")[0];

    const finalData = csvHeader +
      filteredQuestions.reduce((stack, q) => {
        return stack + "\n" + toCsvRow(q);
      }, "");

    await Deno.writeTextFile(filePath, finalData);

    return questionToRemove;
  }
}

export async function getAll() {
  return await loadQuestions();
}
