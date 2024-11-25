import test from "node:test";
import assert from "node:assert";
import { exercise01 } from "../exercise-01.js";

await test("exercise-01 transform vacancies", async () => {
  const result = await exercise01();

  assert.deepStrictEqual(result, [
    { id: "1", label: "Software Engineer" },
    { id: "2", label: "Senior Software Engineer" },
    { id: "3", label: "QA Engineer" },
    { id: "4", label: "Senior QA Engineer" },
  ]);
});
