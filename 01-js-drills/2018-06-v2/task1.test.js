import { test, expect, beforeEach } from "vitest";
import { weeklyData } from "./weeklyData.js";
import { inputCow } from "./task1.js";

beforeEach(() => {
  // Reset data before each test
  weeklyData.forEach(day => day.milking = []);
});

// 1. HAPPY PATH (2 tests)
test("adds valid cow data", () => {
  expect(() => inputCow(0, 101, 20.5, 15.3)).not.toThrow();
});

test("stores cow data correctly", () => {
  inputCow(0, 101, 20.5, 15.3);
  expect(weeklyData[0].milking[0].cowId).toBe(101);
});

// 2. SAD PATH (3 tests - one per validation)
test("rejects invalid day", () => {
  expect(() => inputCow(-1, 101, 20.5, 15.3)).toThrow("Invalid day");
});

test("rejects invalid cow ID", () => {
  expect(() => inputCow(0, 50, 20.5, 15.3)).toThrow("Invalid cow id");
});

test("rejects duplicate cow ID", () => {
  inputCow(0, 101, 20.5, 15.3);
  expect(() => inputCow(1, 101, 18.0, 16.0)).toThrow("already exists");
});

// 3. EDGE CASES (2 tests - boundaries)
test("accepts boundary cow ID 100", () => {
  expect(() => inputCow(0, 100, 20.5, 15.3)).not.toThrow();
});

test("accepts boundary cow ID 999", () => {
  expect(() => inputCow(0, 999, 20.5, 15.3)).not.toThrow();
});
