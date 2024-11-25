import test from "node:test";
import assert from "node:assert";
import { exercise03 } from "../exercise-03.js";

await test("exercise-03 get timesheet record by acitve period", async () => {
  const result = await exercise03();

  assert.equal(result.length, 10);

  result.forEach(item => {
    assert.strictEqual(item.periodId, '231');
  });
});
