import test from "node:test";
import assert from "node:assert";
import { exercise04 } from "../exercise-04.js";

await test("exercise-04 convert callback to promise", async () => {
  const result = await exercise04();
  
  assert.deepEqual(result, { id: 1, name: 'John Doe', email: 'john@example.com' });
});
