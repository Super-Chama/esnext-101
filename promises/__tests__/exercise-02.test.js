import test from "node:test";
import assert from "node:assert";
import { exercise02 } from "../exercise-02.js";

await test("exercise-02 combine user and roles", async () => {
  const result = await exercise02();

  assert.deepStrictEqual(result, [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      role: {
        id: "1",
        name: "Administrator",
      },
    },
    {
      id: "2",
      firstName: "Sam",
      lastName: "Jackson",
      role: {
        id: "1",
        name: "Administrator",
      },
    },
    {
      id: "3",
      firstName: "Max",
      lastName: "Payne",
      role: {
        id: "2",
        name: "ESS User",
      },
    },
  ]);
});
